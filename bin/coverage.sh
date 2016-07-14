#!/bin/bash

# creates 3 reports then combines them
# recommended for covering child processes: https://github.com/gotwarlost/istanbul/issues/97

istanbul cover node_modules/mocha/bin/_mocha test/ --dir ./coverage/dir1
istanbul cover node_modules/mocha/bin/_mocha test/uranium-pass --dir ./coverage/dir2
istanbul cover node_modules/mocha/bin/_mocha test/uranium-fail --dir ./coverage/dir3

istanbul report

rm -R ./coverage/dir1

rm -R ./coverage/dir2

rm -R ./coverage/dir3
