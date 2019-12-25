
let WebSocketServer = require('uws').Server;
let wss = new WebSocketServer({port: 3000});

/**
 * xxx
 * @param {String} message The URL to which to connect
 */
function onMessage(message) {
    console.log('received: ' + message);
}

wss.on('connection', function(ws) {
    ws.on('message', onMessage);
    ws.send('something');
});
