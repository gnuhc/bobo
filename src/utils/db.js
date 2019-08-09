const config = require('../config/dev')
const Table = require('../model/table')
// Create table object to edit database
const table = new Table(config)

exports.table = table