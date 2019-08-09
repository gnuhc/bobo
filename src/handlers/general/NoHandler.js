
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
        var prompt = `Ok, you said no. `

        const responseBuilder = handlerInput.responseBuilder
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes()

        if (sessionAttributes.STATE === 'STATE_AFTER_REPLY')
            prompt = `Ok, have a nice day. `
        
        return responseBuilder
            .speak(prompt)
            .reprompt(prompt)
            .getResponse()
    }
}

module.exports = NoHandler