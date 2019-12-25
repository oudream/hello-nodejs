
'use strict';

const path = require('path');

let testPath11 = function() {
    let sDir = __dirname;
    console.log(sDir);
    console.log(path.normalize(path.join(sDir, '../..')));
};
// testPath11();


let testPath12 = function() {
    let fs = require('fs');

    function scantDir(sDir, bContainDir = false) {
        let outList = [];
        try {
            let stat = fs.statSync(sDir);
            if (stat.isDirectory()) {
                walk(sDir, outList, bContainDir);
            }
        } catch (e) {
        }
        return outList;
    }

    function walk(sDir, outList, bContainDir = false) {
        let dirList = fs.readdirSync(sDir);

        dirList.forEach(function(item) {
            let stat = fs.statSync(sDir + '/' + item);
            if (stat.isFile()) {
                outList.push(sDir + '/' + item);
            }
            if (bContainDir && stat.isDirectory()) {
                outList.push(sDir + '/' + item);
            }
        });

        dirList.forEach(function(item) {
            if (fs.statSync(sDir + '/' + item).isDirectory()) {
                walk(sDir + '/' + item, outList, bContainDir);
            }
        });
    }

    let outList = scantDir('C:\\Users\\oudream\\Desktop\\ICS4000', true);

    console.log(outList.length);
    console.log(outList);
};
// testPath12();


let testPath13 = function() {
    let sPath = 'c:\\sdfasdf/asdfasdf/asdfadf//fdsfaf\\\\sdfasdf/aa/../bb';
    console.log(path.normalize(sPath).split(path.sep));
};
testPath13();

