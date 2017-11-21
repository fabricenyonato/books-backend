const mysql = require('mysql');


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'books-graphql'
});

function dbQuery(query) {
    return new Promise((resolve, reject) => {
        db.query(query, (error, results) => {
            if (error) {
                reject(error);
                throw error;
            }
        
            resolve(results);
        });
    });
}

module.exports = dbQuery;
