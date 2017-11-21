const BaseModel = require('../util/base.model');


class Author extends BaseModel {

    constructor() {
        super();
        this.name = null;
    }
}


module.exports = Author;
