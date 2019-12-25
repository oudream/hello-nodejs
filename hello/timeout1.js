let assert = require('assert');

let immediateThis, intervalThis, timeoutThis;
let immediateArgsThis, intervalArgsThis, timeoutArgsThis;

let iTimes = 0;

let immediateHandler = setImmediate(function() {
    console.log('setImmediate');
    immediateThis = this;
});

let immediateArgsHandler = setImmediate(function() {
    console.log('setImmediate args');
    immediateArgsThis = this;
}, 'args ...');

let intervalHandler = setInterval(function() {
    // clearInterval(intervalHandler);
    console.log('setInterval', iTimes++);
    intervalThis = this;
}, 1000);

let intervalArgsHandler = setInterval(function() {
    // clearInterval(intervalArgsHandler);
    console.log('setInterval args', iTimes++);
    intervalArgsThis = this;
}, 1000, 'args ...');

let timeoutHandler = setTimeout(function() {
    console.log('setTimeout');
    timeoutThis = this;
}, 1000);

let timeoutArgsHandler = setTimeout(function() {
    console.log('setTimeout args');
    timeoutArgsThis = this;
}, 1000, 'args ...');

process.once('exit', function() {
    assert.strictEqual(immediateThis, immediateHandler);
    assert.strictEqual(immediateArgsThis, immediateArgsHandler);

    assert.strictEqual(intervalThis, intervalHandler);
    assert.strictEqual(intervalArgsThis, intervalArgsHandler);

    assert.strictEqual(timeoutThis, timeoutHandler);
    assert.strictEqual(timeoutArgsThis, timeoutArgsHandler);
});
