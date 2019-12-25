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
    database: 'db1',
});

let iTimeOut = 0;
function getInterval() {
    iTimeOut += 300;
    return iTimeOut
}

// DROP TABLE table1;
let testDrop1 = function() {
    let sql = "DROP TABLE IF EXISTS table1 ;";
    pool.getConnection(function(err, connection) {
        if (err) {
            console.log('error ' + String(i));
        }
        else {
            connection.query(sql, [], function (err, values, fields) {
                connection.release(); // always put connection back in pool after last query
                if (err) {
                    console.log('mysql query error: ', err, sql);
                    return;
                }
                console.log('testDrop1:');
                console.log(values);
                console.log(fields);
            });
        }
    })
};
setTimeout(testDrop1, getInterval());

// DROP TABLE table1;
let testDrop2 = function() {
    let sql = "DROP TABLE table2 ;";
    pool.getConnection(function(err, connection) {
        if (err) {
            console.log('error ' + String(i));
        }
        else {
            connection.query(sql, [], function (err, values, fields) {
                connection.release(); // always put connection back in pool after last query
                if (err) {
                    console.log('mysql query error: ', err, sql);
                    return;
                }
                console.log('testDrop2:');
                console.log(values);
                console.log(fields);
            });
        }
    })
};
setTimeout(testDrop2, getInterval());

/**
CREATE TABLE `table1` (
  `f1` int(11) NOT NULL,
  `f2` bigint(20) DEFAULT NULL,
  `f3` double DEFAULT NULL,
  `f4` char(64) DEFAULT NULL,
  `f5` varchar(255) DEFAULT NULL,
  `f6` text,
  PRIMARY KEY (`f1`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
*/
let testCreate1 = function() {
    let sql = "CREATE TABLE IF NOT EXISTS `table1` (\n" +
        "  `f1` int(11) NOT NULL,\n" +
        "  `f2` bigint(20) DEFAULT NULL,\n" +
        "  `f3` double DEFAULT NULL,\n" +
        "  `f4` char(64) DEFAULT NULL,\n" +
        "  `f5` varchar(255) DEFAULT NULL,\n" +
        "  `f6` text,\n" +
        "  PRIMARY KEY (`f1`)\n" +
        ") ENGINE=InnoDB DEFAULT CHARSET=utf8;";
    pool.getConnection(function(err, connection) {
        if (err) {
            console.log('error ' + String(i));
        }
        else {
            connection.query(sql, [], function (err, values, fields) {
                connection.release(); // always put connection back in pool after last query
                if (err) {
                    console.log('mysql query error: ', err, sql);
                    return;
                }
                console.log('testCreate1:');
                console.log(values);
                console.log(fields);
            });
        }
    })
};
setTimeout(testCreate1, getInterval());

// INSERT INTO `db1`.`table1`(`f1`, `f2`, `f3`, `f4`, `f5`, `f6`) VALUES (1, 11, 111, 'aa', 'aaa', 'aaaa');
let testInsert1 = function() {
    let sql = "INSERT INTO `db1`.`table1`(`f1`, `f2`, `f3`, `f4`, `f5`, `f6`) VALUES (1, 11, 111, 'aa', 'aaa', 'aaaa');";
    pool.getConnection(function(err, connection) {
        if (err) {
            console.log('error ' + String(i));
        }
        else {
            connection.query(sql, [], function (err, values, fields) {
                connection.release(); // always put connection back in pool after last query
                if (err) {
                    console.log('mysql query error: ', err, sql);
                    return;
                }
                console.log('testInsert1:');
                console.log(values);
                console.log(fields);
            });
        }
    })
};
setTimeout(testInsert1, getInterval());

// SELECT * FROM table1;
let testSelect1 = function() {
    let sql = "SELECT * FROM table1;";
    pool.getConnection(function(err, connection) {
        if (err) {
            console.log('error ' + String(i));
        }
        else {
            connection.query(sql, [], function (err, values, fields) {
                connection.release(); // always put connection back in pool after last query
                if (err) {
                    console.log('mysql query error: ', err, sql);
                    return;
                }
                console.log('testSelect1:');
                console.log(values);
                console.log(fields);
            });
        }
    })
};
setTimeout(testSelect1, getInterval());

// SELECT COUNT(users.id) as count_users FROM users;
let testSelect2 = function() {
    let sql = "SELECT COUNT(users.id) as count_users FROM users;";
    pool.getConnection(function(err, connection) {
        if (err) {
            console.log('error ' + String(i));
        }
        else {
            connection.query(sql, [], function (err, values, fields) {
                connection.release(); // always put connection back in pool after last query
                if (err) {
                    console.log('mysql query error: ', err, sql);
                    return;
                }
                console.log('testSelect2:');
                console.log(values);
                console.log(fields);
            });
        }
    })
};
setTimeout(testSelect2, getInterval());

// UPDATE `db1`.`table1` SET `f2` = 11, `f3` = 111, `f4` = 'aa', `f5` = 'aaa', `f6` = 'aaaa' WHERE `f1` = 1;
let testUpdate1 = function() {
    let sql = "UPDATE `db1`.`table1` SET `f2` = 22, `f3` = 222, `f4` = 'bb', `f5` = 'bbb', `f6` = 'bbbb' WHERE `f1` = 1;";
    pool.getConnection(function(err, connection) {
        if (err) {
            console.log('error ' + String(i));
        }
        else {
            connection.query(sql, [], function (err, values, fields) {
                connection.release(); // always put connection back in pool after last query
                if (err) {
                    console.log('mysql query error: ', err, sql);
                    return;
                }
                console.log('testUpdate1:');
                console.log(values);
                console.log(fields);
            });
        }
    })
};
setTimeout(testUpdate1, getInterval());

// DELETE FROM table1 WHERE f1='2'
let testDelete1 = function() {
    let sql = "DELETE FROM table1 WHERE f1='1'";
    pool.getConnection(function(err, connection) {
        if (err) {
            console.log('error ' + String(i));
        }
        else {
            connection.query(sql, [], function (err, values, fields) {
                connection.release(); // always put connection back in pool after last query
                if (err) {
                    console.log('mysql query error: ', err, sql);
                    return;
                }
                console.log('testDelete1:');
                console.log(values);
                console.log(fields);
            });
        }
    })
};
setTimeout(testDelete1, getInterval());

/*
testDrop1:
OkPacket {
  fieldCount: 0,
  affectedRows: 0,
  insertId: 0,
  serverStatus: 2,
  warningCount: 0,
  message: '',
  protocol41: true,
  changedRows: 0 }
undefined

testCreate1:
OkPacket {
  fieldCount: 0,
  affectedRows: 0,
  insertId: 0,
  serverStatus: 2,
  warningCount: 0,
  message: '',
  protocol41: true,
  changedRows: 0 }
undefined

testInsert1:
OkPacket {
  fieldCount: 0,
  affectedRows: 1,
  insertId: 0,
  serverStatus: 2,
  warningCount: 0,
  message: '',
  protocol41: true,
  changedRows: 0 }
undefined

testSelect1:
[ RowDataPacket { f1: 1, f2: 11, f3: 111, f4: 'aa', f5: 'aaa', f6: 'aaaa' } ]
[ FieldPacket {
    catalog: 'def',
    db: 'db1',
    table: 'table1',
    orgTable: 'table1',
    name: 'f1',
    orgName: 'f1',
    charsetNr: 63,
    length: 11,
    type: 3,
    flags: 20483,
    decimals: 0,
    default: undefined,
    zeroFill: false,
    protocol41: true },
  FieldPacket {
    catalog: 'def',
    db: 'db1',
    table: 'table1',
    orgTable: 'table1',
    name: 'f2',
    orgName: 'f2',
    charsetNr: 63,
    length: 20,
    type: 8,
    flags: 0,
    decimals: 0,
    default: undefined,
    zeroFill: false,
    protocol41: true },
  FieldPacket {
    catalog: 'def',
    db: 'db1',
    table: 'table1',
    orgTable: 'table1',
    name: 'f3',
    orgName: 'f3',
    charsetNr: 63,
    length: 22,
    type: 5,
    flags: 0,
    decimals: 31,
    default: undefined,
    zeroFill: false,
    protocol41: true },
  FieldPacket {
    catalog: 'def',
    db: 'db1',
    table: 'table1',
    orgTable: 'table1',
    name: 'f4',
    orgName: 'f4',
    charsetNr: 33,
    length: 192,
    type: 254,
    flags: 0,
    decimals: 0,
    default: undefined,
    zeroFill: false,
    protocol41: true },
  FieldPacket {
    catalog: 'def',
    db: 'db1',
    table: 'table1',
    orgTable: 'table1',
    name: 'f5',
    orgName: 'f5',
    charsetNr: 33,
    length: 765,
    type: 253,
    flags: 0,
    decimals: 0,
    default: undefined,
    zeroFill: false,
    protocol41: true },
  FieldPacket {
    catalog: 'def',
    db: 'db1',
    table: 'table1',
    orgTable: 'table1',
    name: 'f6',
    orgName: 'f6',
    charsetNr: 33,
    length: 196605,
    type: 252,
    flags: 16,
    decimals: 0,
    default: undefined,
    zeroFill: false,
    protocol41: true } ]

testUpdate1:
OkPacket {
  fieldCount: 0,
  affectedRows: 1,
  insertId: 0,
  serverStatus: 2,
  warningCount: 0,
  message: '(Rows matched: 1  Changed: 1  Warnings: 0',
  protocol41: true,
  changedRows: 1 }
undefined

testDelete1:
OkPacket {
  fieldCount: 0,
  affectedRows: 1,
  insertId: 0,
  serverStatus: 2,
  warningCount: 0,
  message: '',
  protocol41: true,
  changedRows: 0 }
undefined

 */
