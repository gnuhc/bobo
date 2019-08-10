const Handler = require('../../model/Handler')
const prompts = require('../../utils/prompts')

const LaunchHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request

        return request.type === 'LaunchRequest'
    },
    handle(handlerInput) {
        const handler = new Handler(handlerInput)
        return handler.respond(prompts.WELCOME)
    },
}

module.exports = LaunchHandler