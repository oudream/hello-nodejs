let HttpMysqlServer = require('./../common/csm/http_mysql_server')
let httpMysqlServer = new HttpMysqlServer({
    name: "mysql1",
    type: "mysql",
    connectionLimit: 10,
    database: "db2",
    host: "127.0.0.1",
    pwd: "123456",
    user: "root"
});

let testQueryTrans = () => {
    let sqlAry = [
        "INSERT INTO `db2`.`t1`(`f1`, `f2`) VALUES (11, 1.2);",
        "INSERT INTO `db2`.`t1`(`f1`, `f2`) VALUES (12, 2.1);",
        "INSERT INTO `db2`.`t2`(`f1`, `f2`) VALUES (5, 1.2);",
        "INSERT INTO `db2`.`t2`(`f1`, `f2`) VALUES (6, 2.1);",
        "UPDATE `db2`.`t2` SET `f2` = 2.34 WHERE `f1` = 2;",
        // "DROP TABLE `t1`",
    ];
    let callback = (err, res) => {
        console.log(err);
        console.log(res);
        console.log('testQuerySqls end.');
        httpMysqlServer.close();
    };
    httpMysqlServer.queryTrans(sqlAry, null, callback);
};

testQueryTrans();

let testQuerySqls = () => {
    let sqlAry = [
        "select * from t1",
        "select * from t3",
        "select * from t2",
    ];
    let callback = (err, res) => {
        // console.log(err);
        console.log(res);
        console.log('testQuerySqls end.');
        httpMysqlServer.close();
    };
    httpMysqlServer.querySqls(sqlAry, null, callback);
};

// testQuerySqls();
