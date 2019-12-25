function generate(count) {
    let _sym = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
    let str = '';
    let oldLen = 0;
    let oldStr = '';
    for (let i = 0; i < count; i++) {
        str += _sym[Math.floor(Math.random() * (_sym.length))];
        if (str.length - oldLen > 1) {
            console.log('bb')
        }
        oldLen = str.length;
        oldStr = str;
        if (str.length > 255) {
            console.log('aa')
        }
    }
    return str;
}

function testGenerate1() {
    for (let j = 0; j < 200; j++) {
        let value = generate(Math.round(Math.random() * 254));
        if (value.length > 255) {
            console.log('aa')
        }
    }
}

testGenerate1()