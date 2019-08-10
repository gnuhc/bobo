
const prompts = require('../utils/prompts')

async function ReplyYesResponder(handler) {
    // Get session attributes
    var prompt, attributes = handler.sessionAttributes
    // Set state of skill
    attributes.STATE = 'STATE_AFTER_REPLY_YES'
    handler.setSessionAttributes()

    // TODO: Give more advice

    //return handler.respond(prompt)
    return handler.end(prompts.NO_ADVICE)
}

module.exports = ReplyYesResponder