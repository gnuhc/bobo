
const prompts = require('../../utils/prompts')

const StopHandler = {
    canHandle(handlerInput) {
        const { request } = handlerInput.requestEnvelope

        return request.type === 'IntentRequest' && 
               request.intent.name === 'AMAZON.StopIntent'
    },
    handle(handlerInput) {

        return responseBuilder
            .speak(prompts.STOP)
            .withShouldEndSession(true)
            .getResponse()
    }
}

module.exports = StopHandler