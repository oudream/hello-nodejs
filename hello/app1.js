const assert = require('assert');
const http = require('http');

const server = http.createServer();

let connections = {};

server.on('request', function(req, res) {
    let msg = 'step request ' + Date();
    console.log(msg);
    res.end(msg);
});

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
