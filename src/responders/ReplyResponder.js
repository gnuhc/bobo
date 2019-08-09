
const prompts = require('../utils/prompts').AFTER_REPLY
const constants = require('../utils/constants').constants

async function ReplyResponder(handlerInput) {
    // Get session attributes
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes()
	// Get the intent name
    const intent = handlerInput.requestEnvelope.request.intent.name


    return handlerInput.responseBuilder
    .speak(prompts.AFTER_REPLY)
    .reprompt(prompts.AFTER_REPLY)
    .getResponse()
}

module.exports = ReplyResponder