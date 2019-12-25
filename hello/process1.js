/**
 * Created by oudream on 2017/5/17.
 */
'use strict';

const os = require('os');

console.log(process.argv);

var readline = require('readline');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
});

var stdinPromise = function(iTimeOut = 30000) {
    return new Promise((resolve, reject) => {
        rl.once('line', function(line) {
            resolve(line);
            clearTimeout(timeout);
        });
        var timeout = setTimeout(function() {
            rl.removeAllListeners('line');
            reject(null);
        }, iTimeOut);
    });
};

var helloStdin1 = async function() {
    var line = null;
    try {
        line = await stdinPromise(10000);
    }
    catch (e) {
        console.log('stdin timeout catch');
    }
    if (line) {
        console.log('stdin:', line);
    } else {
        console.log('stdin timeout return');
    }
};


var main1 = async function() {
    console.log('begin:');
    for (let i = 0; i < 1024 * 10; i++) {
        await helloStdin1();
    }
    console.log('end.');
    process.exit(0);
};
main1();


