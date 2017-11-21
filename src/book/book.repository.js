const {dbQuery} = require('../util/db');
const Book = require('./book.model');
const Author = require('../author/author.model');


function insertBook(args) {
    return new Promise((resolve, reject) => {
        dbQuery({
            sql: 'INSERT INTO book(title, publication_date, author_id) VALUES(?, ?, ?)',
            values: [
                args.book.title,
                args.book.publicationDate.toISOString(),
                args.author.id
            ]
        })
        .then((insertBookResult) => {
            return findBook(insertBookResult.insertId)
            .then((book) => {
                resolve(book);
            })
            .catch((error) => {
                reject(error);
            });
        })
        .catch((error) => {
            reject(error);
        });
    });
}


function findBook(id) {
    return new Promise((resolve, reject) => {
        dbQuery({
            sql: 'SELECT b.id book_id, b.title book_title, b.publication_date book_publication_date, b.author_id, a.name author_name FROM book b INNER JOIN author a ON b.author_id=a.id WHERE b.id=?',
            values: [id]
        })
        .then((rows) => {
            if (rows.length === 0) throw new Error(`Book(${id}) not found`);

            const book = new Book();
            book.id = rows[0].book_id;
            book.title = rows[0].book_title;
            book.publicationDate = new Date(rows[0].book_publication_date);

            const author = new Author();
            author.id = rows[0].author_id;
            author.name = rows[0].author_name;

            book.author = author;

            resolve(book);
        })
        .catch((error) => {
            reject(error);
        });
    });
}


function findBooks() {
    return new Promise((resolve, reject) => {
        dbQuery({
            sql: 'SELECT b.id book_id, b.title book_title, b.publication_date book_publication_date, b.author_id, a.name author_name FROM book b INNER JOIN author a ON b.author_id=a.id',
            // values: [id]
        })
        .then((rows) => {
            const books = [];

            for (const row of rows) {
                const book = new Book();
                book.id = row.book_id;
                book.title = row.book_title;
                book.publicationDate = new Date(row.book_publication_date);

                const author = new Author();
                author.id = row.author_id;
                author.name = row.author_name;

                book.author = author;

                books.push(book);
            }

            resolve(books);
        })
        .catch((error) => {
            reject(error);
        });
    });
}


module.exports = {
    insertBook,
    findBook,
    findBooks
};
