const BaseModel = require('../util/base.model');


class Book extends BaseModel {

    constructor() {
        super();
        this.title = null;
        this.publicationDate = null;
    }
}


module.exports = Book;
