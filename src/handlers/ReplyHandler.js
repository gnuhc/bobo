//const ReplyResponder = require('../responders/ReplyResponder')
const Handler = require('../model/Handler')

const ReplyHandler = {
    canHandle(handlerInput) {
        
        const { request } = handlerInput.requestEnvelope
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes()
        return (request.type === 'IntentRequest' && 
               request.intent.name === 'REPLY_INTENT')

    },
    handle(handlerInput) {
        // TODO: Create future reply handling
        //return ReplyResponder(new Handler(handlerInput))
    }
}

module.exports = ReplyHandler