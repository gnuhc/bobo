function checkAddress (address) {
    if (!address.postalCode) {
        return false
    }
    return true
}
module.exports = checkAddress