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
    database: 'mi3_arch',
});

let insCab = function() {
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
// insCab();

// 'INSERT INTO `ti_obj_cab` () VALUES ?'
//
//     `F_ID`,`F_PID`,`F_NID`,`F_MID`,`F_NAME`,`F_URI`, `F_DESC`, `F_CLASS`,`F_COL`,`F_ROW`,`F_LAY`,`F_ADDR_STA`,`F_ADDR_YX`,`F_ADDR_YK`,`F_TYPE`,
//     `F_LEN`,`F_V`,`F_T_CRT`,`F_USER_CRT`,`F_T_MOD`,`F_USER_MOD`,`F_RES0`,`F_RES1`,`F_SYN_FLAG`,`F_DT_FLAG`,`F_ST_FLAG`)
// VALUES


let insertCab = function() {
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
insertCab();
