let fs = require('fs');
let zlib = require('zlib');
let buf = new Buffer(1024);

let testFs1 = function() {
    console.log('准备打开已存在的文件！');
    fs.open('f:/000.txt', 'r+', function(err, fd) {
        if (err) {
            return console.error(err);
        }
        console.log('文件打开成功！');
        console.log('准备读取文件：');

        fs.read(fd, buf, 0, buf.length, iPos, function(err, bytes) {
            if (err) {
                console.log(err);
            }

            console.log('xx');

            console.log(bytes + '  字节被读取');

      // 仅输出读取的字节
            if (bytes > 0) {
                console.log(buf.slice(0, bytes).toString());
                iPos += bytes;
            }
        });

        console.log(iPos);
    });
};
// testFs1();

let testFs2 = function() {
    console.log('压缩文件');
    const r = fs.createReadStream('/test/001.txt');
    const z = zlib.createGzip();
    const w = fs.createWriteStream('/test/001.txt.gz');
    r.pipe(z).pipe(w);
};
// testFs2();
// setImmediate

let testFs3 = function() {
    let buf = Buffer.allocUnsafe(100);
    buf[0] = 0x30;
    buf[2] = 0x32;
    buf[4] = 0x34;
};
// testFs3();

let testFs4 = function() {
    fs.stat('f:/000.txt', (err, stats) => {
        if (err) throw err;
        console.log(`stats: ${JSON.stringify(stats)}`);
    });
};
// testFs4();

let testFs5 = function() {
    let readstream = fs.createReadStream('f:/000.txt');
    readstream.on('error', (err) => {
        console.log(err.message);
    });
    readstream.on('data', function(chunk) {
        console.log('read', chunk.length);
    });
    readstream.on('end', function() {
        console.log('end');
    });
};
// testFs5();

let testFs6 = function() {
    const readable = fs.createReadStream('f:/000.txt');
    let iCount = 0;
    readable.on('error', (err) => {
        console.log(err.message);
    });
    readable.on('readable', () => {
        let chunk;
        while ((chunk = readable.read(1024)) !== null) {
            console.log(`Received ${chunk.length} bytes of data. iCount ${++iCount} ${chunk.constructor.name} ${chunk instanceof Buffer}`);
        }
    });
    readable.on('end', function() {
        console.log('Received end');
    });
};
// testFs6();

let testFs7 = function() {
    let fs = require('fs');
    let data = 'www.hello.com i@y.com';

// 创建一个可以写入的流，写入到文件 output.txt 中
    let writerStream = fs.createWriteStream('f:/output.txt');

// 使用 utf8 编码写入数据
    writerStream.write(data, 'UTF8');

// 标记文件末尾
    writerStream.end();

// 处理流事件 --> data, end, and error
    writerStream.on('finish', function() {
        console.log('写入完成。');
    });

    writerStream.on('error', function(err) {
        console.log(err.stack);
    });

    console.log('程序执行完毕');
};
testFs7();

let testFs8 = function() {
    let fs = require('fs');
    let data = '';

// 创建可读流
    let readerStream = fs.createReadStream('f:/input.txt');

// 设置编码为 utf8。
    readerStream.setEncoding('UTF8');

// 处理流事件 --> data, end, and error
    readerStream.on('data', function(chunk) {
        data += chunk;
    });

    readerStream.on('end', function() {
        console.log(data);
    });

    readerStream.on('error', function(err) {
        console.log(err.stack);
    });

    console.log('程序执行完毕');
};
// testFs8();

let testFs9 = function() {
    let fs = require('fs');

// 创建一个可读流
    let readerStream = fs.createReadStream('input.txt');

// 创建一个可写流
    let writerStream = fs.createWriteStream('output.txt');

// 管道读写操作
// 读取 input.txt 文件内容，并将内容写入到 output.txt 文件中
    readerStream.pipe(writerStream);

    console.log('程序执行完毕');
};
// testFs9();

let testFs10 = function() {
    let sFilePath = 'z:/000.txt';
    fs.open(sFilePath, 'a+', function(err, fd) {
        if (err) return;
        let iPosition = 0;
        for (let i = 0; i < 1000 * 10; i++) {
            let data = new Buffer([i % 0xFF]);
            fs.writeSync(fd, data, 0, 1, iPosition);
            iPosition++;
        }
        fs.close(fd, function(err) {
            if (err) return;
        });
    });
};
// testFs10();

let testFs11 = function() {
    let sFilePath = '/ddd/web/limi3/projects/cc3k/dist/static/svg/33554433.svg;';
    let stat = context.fs.statSync(sFilePath);
    console.log(stat);
};
testFs11();
