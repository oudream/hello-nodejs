
function assertEncoding(encoding) {
    if (encoding && !Buffer.isEncoding(encoding)) {
        throw new Error('Unknown encoding: ' + encoding);
    }
}

function throwOptionsError(options) {
    throw new TypeError('Expected options to be either an object or a string, ' +
    'but got ' + typeof options + ' instead');
}

function nullCheck(path, callback) {
    if (('' + path).indexOf('\u0000') !== -1) {
        let er = new Error('Path must be a string without null bytes');
        er.code = 'ENOENT';
        if (typeof callback !== 'function') {
            throw er;
        }
        process.nextTick(callback, er);
        return false;
    }
    return true;
}

let testAssert11 = function() {
    if (!options || typeof options === 'function') {
        options = {encoding: 'utf8', mode: 0o666, flag: 'w'};
    } else if (typeof options === 'string') {
        options = {encoding: options, mode: 0o666, flag: 'w'};
    } else if (typeof options !== 'object') {
        throwOptionsError(options);
    }

    assertEncoding(encoding);
};
