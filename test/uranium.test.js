'use strict';
/* jshint expr: true */


const MODULE_PATH = '../';

const expect = require( 'chai' ).expect;

const sinon = require( 'sinon' );

const proxyquire = require( 'proxyquire' ).noCallThru();

const control = require( './constants' );


describe( 'uranium', function() {

    let consoleStub;

    it( 'normal operation: Lambda function exists', function( done ) {

        consoleStub = sinon.stub( console, 'log' );

        let controlCliInput = control.response;

        process.argv[2] = controlCliInput;

        let lambdaStub = sinon.stub();

        let promiseStub = sinon.stub().returns( Promise.resolve( control.response ) );

        let LambdaStub = class {

            getFunction( arg ) {

                lambdaStub( arg );

                return {

                    promise: promiseStub
                };
            }
        };

        let awsSdkStub = {

            Lambda: LambdaStub
        }

        Promise.resolve( proxyquire( MODULE_PATH, {

            'aws-sdk': awsSdkStub
        }))
            .then( function() {

                consoleStub.restore()

                expect( lambdaStub.calledOnce ).true;
                expect( lambdaStub.withArgs( { FunctionName: controlCliInput } ).calledOnce ).true;

                expect( promiseStub.calledOnce ).true;
                expect( promiseStub.withArgs().calledOnce ).true;

                expect( consoleStub.callCount ).equal( 5 );
                expect( consoleStub.withArgs( '' ).calledThrice ).true;
                expect( consoleStub.withArgs( 'AWS Lamba function information:' ).calledOnce ).true;
                expect( consoleStub.withArgs( JSON.stringify( control.response, null, 4 ) ).calledOnce ).true;

                consoleStub.reset()

                done();
            })
            .catch( done );
    });

    xit( 'fail: Error in getting Lambda function', function( done ) {

        consoleStub = sinon.stub( console, 'log' );

        let controlCliInput = control.response + 'x'

        process.argv[2] = controlCliInput;

        let controlError = new Error( control.errorMessage );

        let lambdaStub = sinon.stub();

        let promiseStub = sinon.stub().returns( Promise.reject( controlError ) );

        let LambdaStub = class {

            getFunction( arg ) {

                lambdaStub( arg );

                return {

                    promise: promiseStub
                };
            }
        };

        let awsSdkStub = {

            Lambda: LambdaStub
        }

        Promise.resolve( proxyquire( MODULE_PATH, {

            'aws-sdk': awsSdkStub
        }))
            .then( function() {

                consoleStub.restore();
                // consoleStub.restore()

                expect( lambdaStub.calledOnce ).true;
                expect( lambdaStub.withArgs( { FunctionName: controlCliInput } ).calledOnce ).true;

                expect( promiseStub.calledOnce ).true;
                expect( promiseStub.withArgs().calledOnce ).true;

                // expect( consoleStub.callCount ).equal( 5 );
                // expect( consoleStub.withArgs( '' ).calledThrice ).true;
                // expect( consoleStub.withArgs( 'Error occured in retrieving lambda function information:' ).calledOnce ).true;

                // let expectedErrorMessage =  '    ' + control.errorMessage;

                // expect( consoleStub.withArgs( JSON.stringify( control.response, null, 4 ) ).calledOnce ).true;

                consoleStub.reset();

                done();
            })
            .catch( done );
    });
});
