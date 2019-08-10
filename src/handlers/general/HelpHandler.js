const Handler = require('../../model/Handler')
const prompts = require('../../utils/prompts')

const HelpHandler = {
    canHandle(handlerInput) {
        const { request } = handlerInput.requestEnvelope

        return request.type === 'IntentRequest' && 
               request.intent.name === 'AMAZON.HelpIntent'
    },
    handle(handlerInput) {
        const handler = new Handler(handlerInput)
        return handler.respond(prompts.HELP)
    }
}

module.exports = HelpHandler