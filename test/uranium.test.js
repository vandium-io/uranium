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

            expect( collectedData.indexOf( 'AWS Lamba function information:' ) === 1 );

            expect( collectedData.indexOf( control.response ) === 1 );

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

            expect( collectedData.indexOf( 'Error occured in retrieving lambda function information:' ) === 1 );

            expect( collectedData.indexOf( control.errorMessage ) === 1 );

            done();
        });
    });
});
