[![npm version](https://badge.fury.io/js/uranium.svg)](https://badge.fury.io/js/uranium)

#Uranium

Command line interface for retrieving configuration and code for AWS Lambda functions.


##Usage Instructions

1. Install uranium from npm using the following command line command:

```
npm install uranium
```

2. In your command line, go to the directory where the file uranium.js is located; uranium.js is located at the root of the uranium node module.

3. Input a command in the following form:

```
node uranium <function name>
```


##Example Usage

```
node uranium testFunction

// logs the following AWS Lambda function information:

{
    "Configuration": {
        "FunctionName": "testFunction",
        "FunctionArn": "arn:aws:lambda:us-east-1:111122223333:function:testFunction",
        "Runtime": "nodejs4.3",
        "Role": "arn:aws:iam::111122223333:role/testRole",
        "Handler": "index.handler",
        "CodeSize": 10000,
        "Description": "AWS Lambda test function",
        "Timeout": 3,
        "MemorySize": 128,
        "LastModified": "2016-07-07T18:58:59.254+0000",
        "CodeSha256": "N7MXr3rs0xpD269Gd9B5Bbp269uWMQUhQmvfJ69KDnI=",
        "Version": "$LATEST"
    },
    "Code": {
        "RepositoryType": "S3",
        "Location": "https://prod-04-2014-tasks.s3.amazonaws.com/snapshots/111122223333/testFunction-64579743-a24a-46aa-91bb-002fb81cf8c1?x-amz-security-token=FQoDYXdzEGYaDOT3tT8McrJQdKHG0SK3A69h8lpPBUY6qqCcTyGsEMfSfybdxsOjeBtKi1pEXGMxVjuztf1qvYNZHAX8QztKIninhfycGiIST9Bs9z0CHkrn%2FQgl9j2oVKQgSTXBigHijmogLFeTTYDowvsGyYVtAY%2FYQoH3YgDoyytzeBTKrLDxPmZziZnEsOIwY2j1xXC4utnEci8BVUN37%2BFcU9aUaBlzqC1zjWZU0lOAtYldazeK%2B%2BQhJ938K60L33ChWk2vq45nSy0BF2vFBYYdlUtSyM64GjqKcdcgZ4G431VfHiJm4xRlErwdH%2FUuN%2FQSp%2BoLCB5KvF3EPTEGtWLC4meLW8E5jL69OjYLXFBWuRNfFBJKdtkT0sCbzt75JgNbCep9m%2BU%2F8ZXXnoGaKRCcSC6NODOkn2%2FC8tTyGTeNAvtAYu5TAV3hI7cXbbunvorwllLlgepYIRAX0gIZopUKvOkt9zI%2BasisIzEXBHVJsLctxjZYyFmY3JIUfXtQDHiKpUL4UJeyRwPy28fPBSNUD2vmCnwbQJpejDmD3ljwV3uB2Bl79BvRGBJrDaQHW69JE%2FSx5IMMmW6pA3ftVWkyGjbjIEgeUzb69Lgo7tSavAU%3D&AWSAccessKeyId=ASIAILXCFE3SJS2LCNLA&Expires=1468446186&Signature=NXm7KkSck1TyLh3XxVuFKkTVoe0%3D"
    }
}
```

## Feedback

We'd love to get feedback on how to make this tool better. Feel free to contact us at `feedback@vandium.io`


## License

[BSD-3-Clause](https://en.wikipedia.org/wiki/BSD_licenses)
