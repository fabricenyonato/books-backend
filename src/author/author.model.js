const BaseModel = require('../util/base.model');


class Author extends BaseModel {

    constructor() {
        super();
        this.firstName = null;
        this.lastName = null;
    }
}


module.exports = Author;
