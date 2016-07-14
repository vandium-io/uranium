'use strict';
/* jshint expr: true */

const expect = require( 'chai' ).expect;

const control = require( './constants' );

const spawn = require( 'child_process' ).spawn;


describe( 'uranium', function() {

    it( 'normal operation: Lambda function exists', function( done ) {

        let child = spawn( 'node', [ 'uranium-pass', control.FunctionName ], { cwd: __dirname } );

        let collectedData = '';

        child.stdout.on( 'data', function( data ) {

            collectedData+= data.toString();
        });

        child.stderr.on( 'data', function( data ) {

            throw new Error( 'unexpected error: ' + data.toString() );
        });

        child.on( 'close', function( code ) {

            expect( code ).equal( 0 );


            let expectedMessage_1 = 'AWS Lamba function information:';

            expect( collectedData.indexOf( expectedMessage_1 ) >= 0 ).true;


            let expectedMessage_2 = JSON.stringify( control.response, null, 4 );

            expect( collectedData.indexOf( expectedMessage_2 ) > 0 ).true;


            done();
        });
    });

    it( 'fail: Error in getting Lambda function', function( done ) {

        let child = spawn( 'node', [ 'uranium-fail', control.FunctionName + 'x' ], { cwd: __dirname } );

        let collectedData = '';

        child.stdout.on( 'data', function( data ) {

            collectedData+= data.toString();
        });

        child.stderr.on( 'data', function( data ) {

            throw new Error( 'unexpected error: ' + data.toString() );
        });

        child.on( 'close', function( code ) {

            expect( code ).equal( 1 );


            let expectedMessage_1 = 'Error occured in retrieving AWS Lambda function information:';

            expect( collectedData.indexOf( expectedMessage_1 ) >= 0 ).true;


            let expectedMessage_2 = '    ' + control.errorMessage;

            expect( collectedData.indexOf( expectedMessage_2 ) > 0 ).true;


            done();
        });
    });
});
