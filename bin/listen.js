/*global require:false*/
/*global process:false*/

"use strict";

var express = require( 'express' ),
    pull = require( './pull.js' ),
    app = express(),
    port = 8081;

app.get( '/', function ( req, res ) {
    pull.pull();
    res.send("Pulled");
} );

app.listen( port );
console.log( 'Listening on port %s', port );