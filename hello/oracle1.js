
'use strict';
// myscript.js

var oracledb = require('oracledb');

oracledb.getConnection(
    {
        user          : "ICS",
        password      : "ICS",
        connectString : "10.31.16.241/ICS"
    },
    function(err, connection) {
        if (err) {
            console.error(err.message);
            return;
        }
        connection.execute(
            `SELECT manager_id, department_id, department_name
       FROM departments
       WHERE manager_id = :id`,
            [103],  // bind value for :id
            function(err, result) {
                if (err) {
                    console.error(err.message);
                    doRelease(connection);
                    return;
                }
                console.log(result.rows);
                doRelease(connection);
            });
    });

function doRelease(connection) {
    connection.close(
        function(err) {
            if (err)
                console.error(err.message);
        });
}
