'use strict';

const path = require('path');
const fs = require('fs');
const url = require('url');
const os = require('os');

let CjAppEnv = require('./../../common/cjs/cjappenv.js');

exports = module.exports = HttpSql;

function HttpSql() {

}

HttpSql.init = function(httpServer) {
    httpServer.route.all(/\/(.){0,}.sql/, HttpSql.dealRequest);
};

HttpSql.dealRequest = function fn(req, res) {
    // 定义了一个data变量，用于暂存请求体的信息
    let data = '';

    let paramsObj = url.parse(req.url, true).query;

    // 通过req的data事件监听函数，每当接受到请求体的数据，就累加到data变量中
    req.on('data', function(chunk) {
        data += chunk;
    });

    // 在end事件触发后，解释请求体，取出sql语句运行，然后向客户端返回结果。
    req.on('end', function() {
        // data = querystring.parse(data);
        if (data !== '') {
            let dataObj = JSON.parse(data);
            console.log(data);

            let remoteIp = utils.net.getRemoteIpAddress(req);

            let newResId = dataObj.sessionId;
            resMap[newResId] = res;

            cjs.log('收到来自' + remoteIp + '终端的SQL请求');
            // log.writeLog('收到来自' + remoteIp + '终端的SQL请求');

            /** 把请求转到数据库处理服务 */
            global.globalEvent.emit('sql-request', data);
        }
    });

    req.on('error', function(e) {
        console.log(`problem with request: ${e.message}`);
        throw e;
    });
};

