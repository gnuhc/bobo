const ReplyResponder = require('../responders/ReplyResponder')

const ReplyHandler = {
    canHandle(handlerInput) {
        
        const { request } = handlerInput.requestEnvelope
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes()
        return (request.type === 'IntentRequest' && 
               request.intent.name === 'REPLY_INTENT')

    },
    handle(handlerInput) {
        return ReplyResponder(handlerInput)
    }
}

module.exports = ReplyHandler