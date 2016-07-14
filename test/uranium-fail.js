'use strict';
/* jshint expr: true */

// runs uranium with aws-sdk stubbed out

const MODULE_PATH = '../';

const sinon = require( 'sinon' );

const proxyquire = require( 'proxyquire' ).noCallThru();

const control = require( './constants' );


let lambdaStub = sinon.stub();

let promiseStub = sinon.stub().returns( Promise.reject( new Error( control.errorMessage ) ) );

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
};


proxyquire( MODULE_PATH, {

    'aws-sdk': awsSdkStub
});
