const path = require('path');
const fs = require('fs');

process.env.PROJECT_CONFIG_FP = path.resolve(__dirname, './simple.json');

// projectConfig
let projectConfig = require(process.env.PROJECT_CONFIG_FP);

// projectConfig.spec.databases
// interface : [ dealRequest ] : projectConfig.spec.item
let databases = projectConfig.spec.databases;
if (Array.isArray(databases)) {
    for (let i = 0; i < databases.length; i++) {
        let database = databases[i];
        if (database.type === 'mysql') {
            // suport mysql
            let HttpMysqlServer = require('./../../nodejs/common/csm/http_mysql_server');
            let httpMysqlServer = null;
            httpMysqlServer = new HttpMysqlServer(database);
            database.dealRequest = httpMysqlServer.dealRequest;
        }
    }
}

// projectConfig.spec.httpServers
let httpServers = projectConfig.spec.httpServers;
if (Array.isArray(httpServers) && httpServers.length>0) {
    let HttpServer = require('./../../nodejs/common/csm/http_server.js');
    for (let i = 0; i < httpServers.length; i++) {
        let httpServer = httpServers[i];
        let listeningPort = httpServer.listeningPort;
        if (typeof listeningPort === 'number') {
            let routes = httpServer.routes;
            let hs = new HttpServer({
                port: listeningPort,
                staticAssetsPath: httpServer.staticAssetsPath ? path.resolve(__dirname, httpServer.staticAssetsPath) : path.resolve(__dirname, './../../assets'),
            });
            if (Array.isArray(routes)) {
                for (let j = 0; j < routes.length; j++) {
                    let route = routes[i];
                    if (! route.specItem) continue;
                    if (! route.name) continue;
                    if (! route.url) continue;
                    let specItem = projectConfig.spec[route.specItem];
                    if (Array.isArray(specItem)) {
                        let ele = specItem.find(function(element) {
                            if (element.name && element.name === route.name) {
                                return element;
                            }
                        });
                        if (ele && ele.dealRequest) {
                            hs.route.all(route.url, ele.dealRequest);
                            console.log('httpServer : ', listeningPort, ' , route : ', route.url)
                        }
                    }
                }
            }
        }
    }
}


let rtdb = require('./../../assets/common/gcl3/rtdb.js');
