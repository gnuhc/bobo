
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
        var prompt = `Ok, you said yes. `

        const responseBuilder = handlerInput.responseBuilder,
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes()

        if (sessionAttributes.STATE === 'STATE_AFTER_REPLY')
            prompt = `What else would you like help with? `

        return responseBuilder
            .speak(prompt)
            .reprompt(prompt)
            .getResponse()
    }
}

module.exports = YesHandler