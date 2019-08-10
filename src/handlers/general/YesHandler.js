const Handler = require('../../model/Handler')
const ReplyYesResponder = require('../../responders/ReplyYesResponder')

const YesHandler = {
    canHandle(handlerInput) {
        const { request } = handlerInput.requestEnvelope
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes()

        return (request.type === 'IntentRequest' && 
               request.intent.name === 'AMAZON.YesIntent')
               
            //    (request.type === 'Alexa.Presentation.APL.UserEvent' &&
            //    !!request.arguments && request.arguments[0] === 'yes')
    },
    handle(handlerInput) {
        var prompt, handler = new Handler(handlerInput) 

        if (handler.sessionAttributes.STATE === 'STATE_AFTER_REPLY')
            return ReplyYesResponder(handler)
        else 
            prompt = `Ok, you said yes. `

        return handler.respond(prompt)
    }
}

module.exports = YesHandler