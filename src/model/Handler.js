const constants = require('../utils/constants')
const prompts = require('../utils/prompts')

class Handler {

    constructor(handler) {
        this.handler = handler
        this.builder = handler.responseBuilder
        this.sessionAttributes = handler.attributesManager.getSessionAttributes()
        this.userId = handler.requestEnvelope.session.user.userId
        this.request = handler.requestEnvelope.request
        this.accessToken = handler.requestEnvelope.context.System.user.accessToken
        this.intent = this.request.intent.name
    }

    directive(document, data) {
        this.builder
        .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            version: '1.0',		
            document: document,
            datasources: data ? data : {}
        })
    }

    respond(prompt) {
        return this.builder
                .speak(prompt)
                .reprompt(prompt)
                .getResponse()
    }

    end(prompt) {
        return this.builder
                .speak(prompt)
                .withShouldEndSession(true)
                .getResponse()
    }

    askPermission() {
        return this.builder
                .speak(prompts.PERMISSION)
                .withAskForPermissionsConsentCard([constants.ADDRESS])
                .withShouldEndSession(true)
                .getResponse()
    }

    slotsExist() {        
        if (this.request.intent && this.request.intent.slots) {            
            this.slots = this.handler.requestEnvelope.request.intent.slots
            return true
        }
        
        return false
    }

    setSessionAttributes() {
        this.handler.attributesManager.setSessionAttributes(this.sessionAttributes)
    }

    getIntent() {
        return this.intent
    }
}

module.exports = Handler