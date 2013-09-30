/*global require:false*/
/*global process:false*/

"use strict";

var jenkinsapi = require( './jenkins.js' ),
    exec = require( 'child_process' ).exec,
    jenkinsUrl = "http://cimagma.local/jenkins/", //"http://localhost:8080/",
    jenkins = jenkinsapi.init( jenkinsUrl ),
    lamp = require( "./lamp.js" ),
    job = "BankID_2.0_JST", //"TestJake", //"BankID_2.0_JST",
    lastFailBuild = 0,
    lastSuccessBuild = 0,
    soundsPath = "../sound/",
    sounds = {
        success: [ "success1.wav", "success2.wav", "success3.mp3" ],
        failure: [ "failure1.wav", "failure2.wav", { file: "failure3.wav", loop: 3 }, "failure4.wav", "failure5.wav", "failure6.wav", "failure7.mp3" ]
    }
    ;

function Pull() {

}

Pull.prototype.pull = function ( callbackDone ) {

    jenkins.lastBuild( job, function ( err, data ) {

        if ( callbackDone ) {
            callbackDone();
        }

        if ( err ) {
            console.log( err );
            return;
        }

        console.log( "Pulled job '%s', Id '%s', Number '%s', Result '%s', Last fail '%s', Last success '%s'",
            job, data.id, data.number, data.result, lastFailBuild, lastSuccessBuild );

        if ( data.building ) {
            console.log( "Build is still building, aborting" );
            return;
        }

        if ( data.result === "FAILURE" ) {
            // if last fail build isn't the same pulled build number
            if ( lastFailBuild != data.number ) {

                console.log( "Triggering fail for this build" );

                // turn lamp on
                if ( lamp.on( 10 ) ) {
                    // play fail sound if lamp is turned on
                    playSound( false, data.number );
                }
                lastFailBuild = data.number;

                // culprit
                var culprit = data.culprits && data.culprits.length > 0 ? data.culprits[0].id : "";
                if ( culprit ) {
                    console.log( "Culprit '%s'", culprit );
                }
            }
            else {
                console.log( "Already triggered fail for this build" );
            }

        } else {
            if ( data.result == "SUCCESS" ) {
                // if build is fixed
                if ( ( lastFailBuild + 1 ) == data.number && lastSuccessBuild != data.number ) {

                    console.log( "Triggering fixed for this build" );

                    playSound( true, data.number );
                }

                lastSuccessBuild = data.number;
            }

            // turn lamp off
            lamp.off();
        }
    }, {
        'depth': 3
    } );

}

/**
 * @param {boolean} success
 * @param {int} counter
 */
function playSound( success, counter ) {

    var sound = sounds[ success ? "success" : "failure" ],
        file = sound[ counter % sound.length ],
        loop = 1;

    if ( typeof file == "object" ) {
        loop = file.loop;
        file = file.file;
    }

    var soundExec = "mplayer -loop " + loop + " " + soundsPath + file;
    console.log( "Paying sound '%s'", file, soundExec );
    exec( soundExec, outputs );

}

function outputs( error, stdout, stderr ) {
    console.log( ( error || stdout || stderr ) );
}

process.on( "uncaughtExeption", function ( err ) {
    "use strict";
    console.warn( err.stack );
} );

module.exports = new Pull();