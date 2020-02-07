let WebSocketServer = require('uws').Server;
let wss = new WebSocketServer({port: 3901});

let currentWs = null

/**
 * sfasdf
 * @param {string} message xxx
 */
function onMessage(message) {
    console.log('received: ' + message);
    currentWs.send('i done, resp something!');
}

wss.on('connection', function(ws) {
    currentWs = ws;
    ws.on('message', onMessage);
    ws.send('i done, resp something!');
});

console.log(wss.options);
