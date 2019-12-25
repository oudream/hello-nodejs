
let net = require('net');
let fs = require('fs');

let testTcpclient11 = function() {
    const client = net.createConnection({port: 8124}, () => {
        // 'connect' listener
        console.log('connected to server!');
        client.write('world!\r\n');
    });
    client.on('data', (data) => {
        console.log(data.toString());
        client.end();
    });
    client.on('end', () => {
        console.log('disconnected from server');
    });
    client.on('error', function(err) {
        console.log(err.message);
    });
};
testTcpclient11();
