let assert = require('assert');
let path = require('path');
let http = require('http');

require('./../../assets/common/cjs/cjinterinfo');
require('./../../assets/common/cjs/cjstring');

let Route = require('./../common/cjs/cjhttp_route');
let FileServer = require('./../common/cjs/cjhttp_file_server');

let route = new Route();
let fileServer = new FileServer();
fileServer.config.assetsPath = path.normalize(path.join(process.cwd(), '..'));

let server = http.createServer( function(req, res) {
    if (! route.handle(req, res, function( ) {
        console.log(arguments);
    })) {
        fileServer.dispatch(req, res);
    }
});

route.get(/\/(.){0,}.cgi/, function(req, res) {
    res.end('Hello World!');
});

route.get(/\/(.){0,}.sql/, function(req, res) {
    let mysql = require('mysql');
    let pool = mysql.createPool({
        connectionLimit: 10,
        // host            : '10.31.16.253',
        host: '127.0.0.1',
        user: 'ygct',
        password: 'ygct',
        database: 'db1',
    });

    pool.query('select * from table1', function(err, rows, fields) {
        if (err) throw err;

        console.log(JSON.stringify(rows));
    });

    res.end('Hello World!');
});

// server.on('request', function(req, res) {
//
//    var msg = "step request " + Date();
//    console.log(msg);
//    res.end(msg);
// });

server.on('checkContinue', function(req, res) {
    let msg = 'step checkContinue' + Date();
    res.writeContinue();
    console.log(msg);
});

server.on('clientError', (err, socket) => {
    let msg = 'step clientError' + Date();
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
    console.log(msg);
});

server.on('close', function() {
    let msg = 'step close' + Date();
    console.log(msg);
});

server.on('connect', function(req, socket, firstBodyChunk) {
    let msg = 'step connect' + Date();
    console.log(msg);
});

server.on('connection', function(connection) {
    let msg = 'step connection' + Date();
    console.log(msg);
});

server.on('upgrade', function(req, socket, head) {
    let msg = 'step upgrade' + Date();
    console.log(msg);
});

server.listen(9901);
cjs.debug('http server listen 9901');
