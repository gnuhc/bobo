var table = require('../utils/db')

class User {

    constructor() {
        this.table = table
    }

    async load(email) {
        return this.table.query('email', email)
            .then((result) => {
                return this.table.get(result.id)
            })
            .then((info) => {
                this.info = info
                return info
            })
            .catch((err) => {
                console.log(err)
                return null
            })
    }
}

module.exports = User