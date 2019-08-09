const QuestionResponder = require('../responders/QuestionResponder')

const QuestionHandler = {
    canHandle(handlerInput) {
        
        const { request } = handlerInput.requestEnvelope
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes()
        return (request.type === 'IntentRequest' && 
               request.intent.name === 'QUESTION_INTENT')
    },
    handle(handlerInput) {
        return QuestionResponder(handlerInput)
    }
}

module.exports = QuestionHandler