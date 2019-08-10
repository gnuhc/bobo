const QuestionResponder = require('../responders/QuestionResponder')
const Handler = require('../model/Handler')

const QuestionHandler = {
    canHandle(handlerInput) {
        
        const { request } = handlerInput.requestEnvelope
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes()
        return (request.type === 'IntentRequest' && 
               request.intent.name === 'QUESTION_INTENT')
    },
    handle(handlerInput) {
        return QuestionResponder(new Handler(handlerInput))
    }
}

module.exports = QuestionHandler