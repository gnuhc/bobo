
const prompts = require('../../utils/prompts')

const FallbackHandler = {
    canHandle(handlerInput) {
        const { request } = handlerInput.requestEnvelope

        return (request.type === 'IntentRequest' && 
               request.intent.name === 'AMAZON.FallbackIntent')
    },
    handle(handlerInput) {
        
        return responseBuilder
            .speak(prompts.FALLBACK)
            .reprompt(prompts.FALLBACK)
            .getResponse()
    }
}

module.exports = FallbackHandler