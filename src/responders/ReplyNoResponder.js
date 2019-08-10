
const prompts = require('../utils/prompts')

async function ReplyNoResponder(handler) {

    return handler.end(prompts.STOP)
}

module.exports = ReplyNoResponder