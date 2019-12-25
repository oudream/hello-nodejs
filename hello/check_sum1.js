/**
 * Created by oudream on 2017/3/17.
 */

// var Buffer = require("buffer")

let testCheckSum1 = function() {
    const buf1 = Buffer.from('414243', 'hex');
    const buf2 = Buffer.from('ABCD');

    for (var i = 0; i < 26; i++) {
        // 97 is the decimal ASCII value for 'a'
        buf1[i] = i + 97;
    }

    let crc = 0;
    console.log(buf1[0]);
    console.log(buf1[1]);

    for (var i = 0; i < 3; i++) {
        crc = (crc + buf1[i]) & 0xff;
    }

    console.log(crc);
};
testCheckSum1();
