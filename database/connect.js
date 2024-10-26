function connect() {
    var mysql = require('mysql');

    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'qqwww520kk',
        password: 'password',
        port: '3306',
        database: 'mysqldb',
        charset: 'utf8mb4'
    });

    return connection;
}


module.exports = {
    connect
}
