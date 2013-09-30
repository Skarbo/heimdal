/*global require:false*/
/*global process:false*/

"use strict";

var pull = require( './pull.js' ),
    timer = 5000,
    timeout = null
    ;

var callbackDone = function () {
    timeout = setTimeout( function () {
        pull.pull( callbackDone() );
    }, timer );
}

pull.pull(callbackDone());