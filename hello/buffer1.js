/**
 * Created by oudream on 2017/3/17.
 */

// var buffer = require("buffer");
let fs = require('fs');

let testBufferNumber1 = function() {
    const buf = Buffer.alloc(32);

    console.log(buf.length);

    buf.writeIntLE(0xF1F2F3F4, 0, 4, true);

    console.log(buf.length);

// Prints: <Buffer 43 eb d5 b7 dd f9 5f d7>
    console.log(buf);

    buf.writeIntLE(1483203661000, 0, 8);
// buf.writeDoubleLE(0x810203040506, 0, 10);

    console.log(buf.length);

// Prints: <Buffer d7 5f f9 dd b7 d5 eb 43>
    console.log(buf);

    let i1 = buf.readIntLE(0, 8);
    console.log(i1);

    const buf1 = Buffer.allocUnsafe(0);
};
// testBufferNumber1();

let testBufferString1 = function() {
    const buf = Buffer.alloc(128);

    console.log(buf.length);

    let s1 = 'user1';
    buf.write(s1, 0, 'utf-8');

    console.log(buf.length);

// Prints: <Buffer 43 eb d5 b7 dd f9 5f d7>
    console.log(buf);

    let s2 = 'hello world.';
    buf.write(s2, Buffer.byteLength(s1, 'utf-8'), 'utf-8');
// buf.writeDoubleLE(0x810203040506, 0, 10);

    console.log(buf.length);

// Prints: <Buffer d7 5f f9 dd b7 d5 eb 43>
    console.log(buf);

    let s3 = buf.toString('utf-8', 0, Buffer.byteLength(s1, 'utf-8'));
    console.log(s3);

    let s4 = buf.toString('utf-8', Buffer.byteLength(s1, 'utf-8'), Buffer.byteLength(s1, 'utf-8') + Buffer.byteLength(s2, 'utf-8') + 10);
    let iIndex = s4.indexOf('\0');
    if (iIndex > -1) s4 = s4.substring(0, iIndex);
    console.log(s4);
};
// testBufferString1();

let testBufferFile1 = function() {
    const buf = Buffer.allocUnsafe(128);

    buf[0] = 0x30;
    buf[2] = 0x32;
    buf[4] = 0x34;

    console.log(buf.length);

    console.log(buf.toJSON());

    fs.writeFile('f:/000.txt', buf, function(err) {
        if (err) {
            console.log(err);
        }
    });
};
// testBufferFile1();

let testBufferString2 = function() {
    const buf = Buffer.allocUnsafe(128);

    buf[45] = 112;
    buf[46] = 113;

    let value = buf.toString('utf8', 45, 47);

    console.log(value);
};
testBufferString2();

