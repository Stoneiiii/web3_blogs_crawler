function queryAll() {
    const con = require("../connect.js");
    const connection = con.connect();
    connection.connect();

    var sql = 'SELECT * FROM blogs';

    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return;
        }

        console.log('--------------------------SELECT----------------------------');
        // console.log(result);
        result.forEach(row => {
            console.log('Row Data:');
            console.log('ID:', row.id);
            console.log('Description:', row.description);
            console.log('Time:', row.time);
            console.log('Title:', row.title);
            console.log('URL:', row.url);
            console.log('Article Body:', row.articlebody);
            console.log('------------------------');
        });
        console.log('------------------------------------------------------------\n\n');
    });

    connection.end();
}

module.exports = {
    queryAll
}

