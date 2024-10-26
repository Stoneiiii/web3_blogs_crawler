
function insert(data) {
    const con = require("../connect.js");
    const connection = con.connect();
    connection.connect();

    var addSql = `INSERT INTO blogs (description, time, title, url, articlebody) VALUES (?, ?, ?, ?, ?);`;
    var addSqlParams = [data.description, data.time, data.title, data.url, data.body];

    connection.query(addSql, addSqlParams, function (err, result) {
        if (err) {
            console.log('[INSERT ERROR] - ', err.message);
            return;
        }
        console.log('Successful, INSERT ID:',result.insertId);
    });

    connection.end();
}

module.exports = {
    insert
}
