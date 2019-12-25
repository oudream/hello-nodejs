/**
 * Created by oudream on 2016/11/24.
 */

'use strict';

let mysql = require('mysql');
let pool = mysql.createPool({
    connectionLimit: 10,
    // host            : '10.31.16.253',
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    database: 'ics4000',
});

// pool.query('select * from table1', function(err, rows, fields) {
//     if (err) throw err;
//
//     console.log(JSON.stringify(rows));
// });

let testDb1 = function() {
    let sql = 'INSERT INTO Test (name, email, n) VALUES ?';
    let values = [
        ['demian', 'demian@gmail.com', 5],
        ['john', 'john@gmail.com', 6],
        ['mark', 'mark@gmail.com', 7],
        ['pete', 'pete@gmail.com', 8],
    ];
    pool.query(sql, [values], function(err) {
        if (err) throw err;
        pool.end();
    });
};
// testDb1();

let insertYx1 = function() {
    pool.getConnection(function(err, connection) {
        if (err) {
            console.log('error ' + String(i));
        }
        else {
            for (let i = 0; i < 512; ) {
                let sql = 'INSERT INTO `ics4000`.`omc_signalurl`(`NeNo`, `SignalNo`, `SignalUrl`, `SignalName`, `OnDesc`, `OffDesc`) VALUES ?';
                let values = [
                    [262145, 0x112000100C + i, 'url_yx'+String(i), 'name_yx'+String(i++), 'on', 'off'],
                    [262145, 0x112000100C + i, 'url_yx'+String(i), 'name_yx'+String(i++), 'on', 'off'],
                    [262145, 0x112000100C + i, 'url_yx'+String(i), 'name_yx'+String(i++), 'on', 'off'],
                    [262145, 0x112000100C + i, 'url_yx'+String(i), 'name_yx'+String(i++), 'on', 'off']
                ];
                connection.query(sql, [values], function (err) {
                    console.log('insert ' + String(i));
                    if (err) throw err;
                });
            }
        }
    })
};
insertYx1();

let insertYc1 = function() {
    pool.getConnection(function(err, connection) {
        if (err) {
            console.log('error ' + String(i));
        }
        else {
            for (let i = 0; i < 256;) {
                let sql = 'INSERT INTO `ics4000`.`omc_signalurl`(`NeNo`, `SignalNo`, `SignalUrl`, `SignalName`, `OnDesc`, `OffDesc`) VALUES ?';
                let values = [
                    [262146, 0x2b0b001054 + i, 'url_yc'+String(i), 'name_yc'+String(i++), 'on', 'off'],
                    [262146, 0x2b0b001054 + i, 'url_yc'+String(i), 'name_yc'+String(i++), 'on', 'off'],
                    [262146, 0x2b0b001054 + i, 'url_yc'+String(i), 'name_yc'+String(i++), 'on', 'off'],
                    [262146, 0x2b0b001054 + i, 'url_yc'+String(i), 'name_yc'+String(i++), 'on', 'off']
                ];
                connection.query(sql, [values], function (err) {
                    console.log('insert ' + String(i));
                    if (err) throw err;
                });
            }
        }
    })
};
insertYc1();

let insertYw1 = function() {
    pool.getConnection(function(err, connection) {
        if (err) {
            console.log('error ' + String(i));
        }
        else {
            for (let i = 0; i < 128; ) {
                let sql = 'INSERT INTO `ics4000`.`omc_signalurl`(`NeNo`, `SignalNo`, `SignalUrl`, `SignalName`, `OnDesc`, `OffDesc`) VALUES ?';
                let values = [
                    [262147, 0x312000100C + i, 'url_yw'+String(i), 'name_yw'+String(i++), 'on', 'off'],
                    [262147, 0x312000100C + i, 'url_yw'+String(i), 'name_yw'+String(i++), 'on', 'off'],
                    [262147, 0x312000100C + i, 'url_yw'+String(i), 'name_yw'+String(i++), 'on', 'off'],
                    [262147, 0x312000100C + i, 'url_yw'+String(i), 'name_yw'+String(i++), 'on', 'off']
                ];
                connection.query(sql, [values], function (err) {
                    console.log('insert ' + String(i));
                    if (err) throw err;
                });
            }
        }
    })
};
insertYw1();
