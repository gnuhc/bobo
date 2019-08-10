const Handler = require('../../model/Handler')
const ReplyNoResponder = require('../../responders/ReplyNoResponder')

const NoHandler = {
    canHandle(handlerInput) {
        const { request } = handlerInput.requestEnvelope
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes()
        return (request.type === 'IntentRequest' && 
               request.intent.name === 'AMAZON.NoIntent') //||
               
            //    (request.type === 'Alexa.Presentation.APL.UserEvent' &&
            //    !!request.arguments && request.arguments[0] === 'no')
    },
    handle(handlerInput) {
        var prompt, handler = new Handler(handlerInput)

        if (handler.sessionAttributes.STATE === 'STATE_AFTER_REPLY')
            return ReplyNoResponder(handler)
        else 
            prompt = `Ok, you said no. `

        return handler.respond(prompt)
    }
}

module.exports = NoHandler