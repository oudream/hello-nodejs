console.log('main 开始');
const a = require('./a.js');
const b = require('./b.js');
console.log('在 main 中，a.done=%j，b.done=%j', a.done, b.done);

setInterval(function() {
    delete require.cache[require.resolve('./a.js')];
    delete require.cache[require.resolve('./b.js')];
    const c = require('./a.js');
    const d = require('./b.js');
    console.log('在 main 中，a.done=%j，b.done=%j', c.done, d.done);
}, 2000);