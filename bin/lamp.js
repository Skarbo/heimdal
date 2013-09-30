/*global require:false*/
/*global module:false*/

var timeout = null,
    debug = false,
// unique device id for lamp
    deviceId = 63823,
    exec = require( 'child_process' ).exec,
// lamp command
    commandLamp = "clewarecontrol -c 1 -d " + deviceId + " -as 0 "
//commandSound = "mplayer alarm.mp3"
    ;

function Lamp() {
}

/**
 * @param time
 * @returns {boolean} True if lamp is turned on, false if lamp is already on
 */
Lamp.prototype.on = function ( time ) {
    console.log( "Lamp ON!" );
    if ( !timeout ) {
        if ( !debug ) {
            exec( commandLamp + 1, outputs );
        }
        timeout = setTimeout( this.off, time * 1000 );
        return true;
    }
    else {
        return false;
    }
};

Lamp.prototype.off = function () {
    console.log( "Lamp OFF" );
    if ( !debug ) {
        exec( commandLamp + 0, outputs );
    }
    timeout = null;
};

function outputs( error, stdout, stderr ) {
    console.log( ( error || stdout || stderr ) );
}

module.exports = new Lamp();