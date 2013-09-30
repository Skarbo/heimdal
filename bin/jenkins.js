/*global require:false*/
/*global module:false*/

"use strict";

var request = require( 'request' );

var init = exports.init = function ( host ) {

    var host = host;

    var paramsStringify = function ( params ) {
        if ( !params || typeof params != "object" ) {
            return "";
        }
        var param = [];
        for ( var p in params ) {
            param.push( params[p] );
        }
        return param.join( "&" );
    }

    return {

        lastBuild: function ( jobname, callback, params ) {
            request( {
                method: 'GET',
                url: host + "/job/" + jobname + "/lastBuild/api/json?" + paramsStringify( params )
            }, function ( error, response, body ) {
                if ( error || response.statusCode !== 200 ) {
                    callback( error || true, response );
                    return;
                }

                var data = JSON.parse( body.toString() );
                callback( null, data );
            } )
        }

    };

};

