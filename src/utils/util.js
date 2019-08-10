const config = require('../config/dev')

function checkAddress (address) {
    if (!address.postalCode) {
        return false
    }
    return true
}

exports.checkAddress = checkAddress
