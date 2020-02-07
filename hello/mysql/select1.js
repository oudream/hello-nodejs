
'use strict';

let mysql = require('mysql');
let pool = mysql.createPool({
    connectionLimit: 10,
    // host            : '10.31.16.253',
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    database: 'db2',
});

let query = function(sql, values) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {
            if (err) {
                reject(err)
            }
            else {
                connection.query(sql, values, (err, rows) => {
                    if (err) {
                        reject(err)
                    }
                    else {
                        resolve(rows)
                    }
                    connection.release()
                })
            }
        })
    })
};

async function selectAllData( ) {
    let sql = 'select EthernetIP from omc_neconfig where NeNo = \'5308417\''
    let dataList = await query( sql )
    return dataList
}

async function getData() {
    try {
        let dataList = await selectAllData()
        console.log( dataList )
    }
    catch (e) {
        console.log( 'error' )
    }
    console.log( 'end.' )
}

async function getData2() {
    try {
        let sql = 'select EthernetIP from omc_neconfig where NeNo = \'5308417\''
        let dataList = await query( sql )
        console.log( dataList )
    }
    catch (e) {
        console.log( 'error' )
    }
    console.log( 'end.' )
}

// getData2();


function promiseQueryQueue (executors) {
    return new Promise((resolve, reject) => {
        if (!Array.isArray(executors)) { executors = Array.from(executors) }
        if (executors.length <= 0) { return resolve([]) }

        let res = [];
        executors = executors.map((x, i) => () => {
            let p = typeof x === 'function' ? new Promise(x) : Promise.resolve(x);
            p.then((err, values, fields) => {
                res[i] = {err: err, values: values, fields: fields};
                if (err !== null) {
                    resolve(err, res);
                } else if (i === executors.length - 1) {
                    resolve(null, res);
                } else {
                    executors[i + 1]()
                }
            }, reject)
        });
        executors[0]();
    })
}

let querySqls = function(sqlAry, sqlValuesAry, callback) {
    if (! Array.isArray(sqlAry) || sqlAry.length < 1) {
        callback(new Error('sqlAry invalid!'));
        return;
    }
    let sqlValuesAry2 = Array.isArray(sqlValuesAry) && sqlValuesAry.length === sqlAry.length ? sqlValuesAry : sqlAry.map(x => []);

    pool.getConnection(function(err, connection) {
        if (err) {
            callback(err);
            return;
        }

        let querySql = (sql, sqlValues) => {
            return resolve => {
                connection.query(sql, sqlValues, (err, values, fields) => {
                    if (err) {
                        connection.rollback();
                        resolve(err, values, fields);
                    }
                    else {
                        resolve(null, values, fields);
                    }
                });
            }
        };

        connection.beginTransaction(function(err) {
            if (err) {
                connection.release();
                callback(err);
                return;
            }

            let querySqlFns = [];
            for (let i = 0; i < sqlAry.length; i++) {
                querySqlFns.push(querySql(sqlAry[i], sqlValuesAry2[i]));
            }
            let queryQueueCallback = (err, res) => {
                if (err) {
                    connection.rollback(()=>{
                        connection.release();
                        callback(err, res);
                    });
                } else {
                    connection.commit(err => {
                        if (err) {
                            connection.rollback(()=>{
                                connection.release();
                                callback(err, res);
                            });
                        } else {
                            connection.release();
                            callback(err, res);
                        }
                    });
                }
            };
            promiseQueryQueue(querySqlFns).then(queryQueueCallback);
        });
    })
};

let testQuerySqls = () => {
    let sqlAry = [
        "CREATE TABLE `t1` (\n" +
        "  `f1` int(11) NOT NULL,\n" +
        "  `f2` double DEFAULT NULL,\n" +
        "  PRIMARY KEY (`f1`)\n" +
        ")",
        "INSERT INTO `db2`.`t1`(`f1`, `f2`) VALUES (1, 1.2);",
        "INSERT INTO `db2`.`t1`(`f1`, `f2`) VALUES (2, 2.1);",
        "UPDATE `db2`.`t1` SET `f2` = 2.34 WHERE `f1` = 2;",
        "DROP TABLE `t1`",
    ];
    let callback = (err, res) => {
        // console.log(err, res);
        console.log('testQuerySqls end.');
    };
    querySqls(sqlAry, null, callback);
};

testQuerySqls();
testQuerySqls();
testQuerySqls();
testQuerySqls();
testQuerySqls();
testQuerySqls();
testQuerySqls();
testQuerySqls();
testQuerySqls();
testQuerySqls();
testQuerySqls();
testQuerySqls();
testQuerySqls();
