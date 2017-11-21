const mysql = require('mysql');
// const {error} = require('./functions');


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'books'
});

function dbQuery(query) {
    return new Promise((resolve, reject) => {
        db.query(query, (error, results) => {
            if (error) {
                reject(error);
                console.log(error);
                return;
            }
        
            resolve(results);
        });
    });
}


function dbTransaction() {
    return new Promise((resolve, reject) => {
        db.beginTransaction((error) => {
            if (error) {
                reject(error);
                db.rollback();
                console.log(error);
                return;
            }

            resolve(db);
        });
    });
}


function dbCommit() {
    return new Promise((resolve, reject) => {
        db.commit((error) => {
            if (error) {
                reject(error);
                db.rollback();
                console.log(error);
                return;
            }

            resolve();
        });
    });
}


module.exports = {
    dbQuery,
    dbTransaction,
    dbCommit
};
