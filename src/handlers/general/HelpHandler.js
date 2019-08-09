
const prompts = require('../../utils/prompts')

const HelpHandler = {
    canHandle(handlerInput) {
        const { request } = handlerInput.requestEnvelope

        return request.type === 'IntentRequest' && 
               request.intent.name === 'AMAZON.HelpIntent'
    },
    handle(handlerInput) {
        
        const attributesManager = handlerInput.attributesManager
        const responseBuilder = handlerInput.responseBuilder

        return responseBuilder
            .speak(prompts.HELP)
            .reprompt(prompts.HELP)
            .getResponse()
    }
}

module.exports = HelpHandler