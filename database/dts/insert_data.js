

function insertData(data) {
    for (const ele of data) {
        const { insert } = require('../operations/insert.js');
        insert(ele);
    }
}

module.exports = {
    insertData
}