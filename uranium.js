'use strict';

const AWS = require( 'aws-sdk' );

const lambda = new AWS.Lambda();


(function getFunction( FunctionName ) {

    return lambda.getFunction( { FunctionName } ).promise()

        .then( logFunctionInfo )

        .catch( logError );

})( process.argv[ 2 ] );


function logFunctionInfo( configInfo ) {

    console.log( '' );

    console.log( 'AWS Lamba function information:' );

    console.log( '' );

    console.log( JSON.stringify( configInfo, null, 4 ) );

    console.log( '' );

    process.exit( 0 );
}


function logError( err ) {

    console.log( '' );

    console.log( 'Error occured in retrieving AWS Lambda function information:' );

    console.log( '' );

    console.log( '    ' + err.message )

    console.log( '' );

    process.exit( 1 );
}
