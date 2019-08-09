
const prompts = require('../../utils/prompts')

const CancelHandler = {
    canHandle(handlerInput) {
        
        const { request } = handlerInput.requestEnvelope

        return request.type === 'IntentRequest' && 
               request.intent.name === 'AMAZON.CancelIntent'
    },
    handle(handlerInput) {

        return responseBuilder
            .speak(prompts.STOP)
            .reprompt(prompts.STOP)
            .getResponse()
    }
}

module.exports = CancelHandler