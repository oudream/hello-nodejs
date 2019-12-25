let http = require('http');
let fs = require('fs');
let url = require('url');
let WebSocketServer = require('ws').Server;

let HTTP_PORT = 7081;
let WEBSOCKET_PORT = 7091;

http.createServer(function(request, response) {
    let pathname = url.parse(request.url).pathname;

    console.log('Request for ' + pathname + ' received.');

    fs.readFile(pathname.substr(1), function(err, data) {
        if (err) {
            // 404 : NOT FOUND
            console.log(err);
            response.writeHead(404, {'Content-Type': 'text/html'});
        } else {
            // 200 : OK
            response.writeHead(200, {'Content-Type': 'text/html'});

            response.write(data.toString());
        }
        response.end();
    });
}).listen(HTTP_PORT);
console.log('HttpServer running at http://127.0.0.1:#%d/', HTTP_PORT);


let clientId = 0;
let clientReceivedCount = 0;
let serverSentBytes = 0;
let message = JSON.stringify({
    data1: 'A wiki is run using wiki software, otherwise known as a wiki engine. A wiki engine is a type of content management system, but it differs from most other such systems, including blog software, in that the content is created without any defined owner or leader, and wikis have little inherent structure, allowing structure to emerge according to the needs of the users.[2] There are dozens of different wiki engines in use, both standalone and part of other software, such as bug tracking systems. Some wiki engines are open source, whereas others are proprietary. Some permit control over different functions (levels of access); for example, editing rights may permit changing, adding, or removing material. Others may permit access without enforcing access control. Other rules may be imposed to organize content.or removing material. Others may permit access without enforcing access control.',
    data2: 'B wiki is run using wiki software, otherwise known as a wiki engine. A wiki engine is a type of content management system, but it differs from most other such systems, including blog software, in that the content is created without any defined owner or leader, and wikis have little inherent structure, allowing structure to emerge according to the needs of the users.[2] There are dozens of different wiki engines in use, both standalone and part of other software, such as bug tracking systems. Some wiki engines are open source, whereas others are proprietary. Some permit control over different functions (levels of access); for example, editing rights may permit changing, adding, or removing material. Others may permit access without enforcing access control. Other rules may be imposed to organize content.or removing material. Others may permit access without enforcing access control.',
    data3: 'C wiki is run using wiki software, otherwise known as a wiki engine. A wiki engine is a type of content management system, but it differs from most other such systems, including blog software, in that the content is created without any defined owner or leader, and wikis have little inherent structure, allowing structure to emerge according to the needs of the users.[2] There are dozens of different wiki engines in use, both standalone and part of other software, such as bug tracking systems. Some wiki engines are open source, whereas others are proprietary. Some permit control over different functions (levels of access); for example, editing rights may permit changing, adding, or removing material. Others may permit access without enforcing access control. Other rules may be imposed to organize content.or removing material. Others may permit access without enforcing access control.',
    data4: 'D wiki is run using wiki software, otherwise known as a wiki engine. A wiki engine is a type of content management system, but it differs from most other such systems, including blog software, in that the content is created without any defined owner or leader, and wikis have little inherent structure, allowing structure to emerge according to the needs of the users.[2] There are dozens of different wiki engines in use, both standalone and part of other software, such as bug tracking systems. Some wiki engines are open source, whereas others are proprietary. Some permit control over different functions (levels of access); for example, editing rights may permit changing, adding, or removing material. Others may permit access without enforcing access control. Other rules may be imposed to organize content.or removing material. Others may permit access without enforcing access control.',
    dt: Date.now(),
});
let wss = new WebSocketServer({port: WEBSOCKET_PORT});
wss.on('connection', function(ws) {
    let thisId = ++clientId;
    console.log('Client #%d connected', thisId);
    serverSentBytes = 0;
    clientReceivedCount = 0;

    let sendTestData = function() {
        ws.send(message);
        serverSentBytes += message.length * 4;
    };

    ws.on('message', function(data) {
        clientReceivedCount += data.length;
        sendTestData();
    });

    ws.on('close', function() {
        console.log('Client #%d disconnected', thisId);
    });

    ws.on('error', function(e) {
        console.log('Client #%d error: %s', thisId, e.message);
    });
});
console.log('WebSocketServer running at http://127.0.0.1:#%d/', WEBSOCKET_PORT);

setInterval(function() {
    console.log('Client clientReceivedCount: #%d Mb - serverSentBytes: #%d Mb', clientReceivedCount / 1024 / 1024, serverSentBytes / 1024 / 1024);
}, 3000);
