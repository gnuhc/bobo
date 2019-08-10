
const prompts = require('../../utils/prompts')
const Handler = require('../../model/Handler')

const FallbackHandler = {
    canHandle(handlerInput) {
        const { request } = handlerInput.requestEnvelope

        return (request.type === 'IntentRequest' && 
               request.intent.name === 'AMAZON.FallbackIntent')
    },
    handle(handlerInput) {
        const handler = new Handler(handlerInput)
        return handler.respond(prompts.FALLBACK)
    }
}

module.exports = FallbackHandler