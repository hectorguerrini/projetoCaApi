var sql = require('mssql')
const config = {
    user: 'node',
    password: 'nodeadmin',
    server: '192.168.15.3', // You can use 'localhost\\instance' to connect to named instance
    database: 'DB01',
    pool: {
        max: 20,
        min: 0,
        idleTimeoutMillis: 30000
    }
}

module.exports = function () {

    let response = {}


    response.queryDB = function(query, callback) {
        const pool = new sql.ConnectionPool(config, function (err) {
            if (err) {
                console.error("error connecting: " + err.stack);
                callback(true);
            }            

            var conn = new sql.Request(pool);
            conn.query(query, function (error, result) {

                if (error) {
                    console.dir(error);
                    callback(true);
                } else {
                    callback(false, result.recordset);
                }

            });

        });

    };

    return response;
}

