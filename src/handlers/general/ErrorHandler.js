
const ErrorHandler = {
    canHandle() {
        return true
    },
    handle(handlerInput, error) {
        const attributesManager = handlerInput.attributesManager
        const request = handlerInput.requestEnvelope.request
        const requestAttributes = attributesManager.getRequestAttributes()
        const prompt = 'Sorry, I\'m not able to understand that yet. Please say again. '

        console.log(`Error handled: ${error.message}`)
        console.log(` Original request was ${JSON.stringify(request, null, 2)}\n`)

        return handlerInput.responseBuilder
            .speak(prompt)
            .reprompt(prompt)
            .getResponse()
    },
}

module.exports = ErrorHandler