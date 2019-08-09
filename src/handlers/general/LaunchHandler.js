
const prompts = require('../../utils/prompts')

const LaunchHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request

        return request.type === 'LaunchRequest'
    },
    handle(handlerInput) {
        
        return handlerInput.responseBuilder
        .speak(prompts.WELCOME)
        .reprompt(prompts.WELCOME)
        .getResponse()

    },
}

module.exports = LaunchHandler