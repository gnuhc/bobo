
const prompts = require('../../utils/prompts')
const Handler = require('../../model/Handler')

const StopHandler = {
    canHandle(handlerInput) {
        const { request } = handlerInput.requestEnvelope

        return request.type === 'IntentRequest' && 
               request.intent.name === 'AMAZON.StopIntent'
    },
    handle(handlerInput) {
        const handler = new Handler(handlerInput)
        return handler.respond(prompts.STOP)
    }
}

module.exports = StopHandler