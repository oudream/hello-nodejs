let mysql = require('mysql');
let pool = mysql.createPool({
    connectionLimit: 10,
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    database: 'db1',
});

let fnSelect1 = function() {
    pool.getConnection(function(err, connection) {
        if (err) {
            console.log('error ' + String(i));
        }
        else {
            connection.query('select * from table1', function(err, rows, fields) {
                if (err) throw err;
                console.log(JSON.stringify(rows));
                console.log(JSON.stringify(fields));
            });
        }
    })
};
fnSelect1();
