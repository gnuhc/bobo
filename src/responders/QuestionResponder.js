const askForAddressPermissions = require('../utils/AlexaPermissions').askForAddressPermissions
const getEmail = require('../utils/AlexaPermissions').getEmail

const checkAddress = require('../utils/CheckAddress')
const getWeather = require('../utils/GetWeather')
const prompts = require('../utils/prompts')
const constants = require('../utils/constants').constants
const table = require('../utils/db').table

async function QuestionResponder(handlerInput) {
    // Get session attributes
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes()
	// Get the intent name
    const intent = handlerInput.requestEnvelope.request.intent.name
    // Check address permissions
    var user, address = await askForAddressPermissions(handlerInput)

    // If permissions denied
    if (! checkAddress(address)) {
        return handlerInput.responseBuilder
        .speak(prompts.PERMISSION)
        .withAskForPermissionsConsentCard([constants.ADDRESS])
        .withShouldEndSession(true)
        .getResponse()
    }

    // Location information was never registered to user's Alexa Account
    if (! address.postalCode) {
        // Give regular response with no location based info
        return handlerInput.responseBuilder
        .speak(prompts.REGISTER_DEVICE)
        .withShouldEndSession(true)
        .getResponse()
    }

    var [ email, weather ] = await Promise.all([
        // Get user email
        getEmail(),
        // Get weather pertaining to user location
        getWeather(address.postalCode)
    ])

    if (email) {
        // Get user data from database
        user = await table.get(email)
        // Do things with user data...
    }

    if (weather) {
        // Do things with weather data...

    }

    // Depending on weather, produce different prompt
    prompt = prompts.RAIN

    // Set state of skill
    sessionAttributes.STATE = 'STATE_AFTER_REPLY'
    handlerInput.attributesManager.setSessionAttributes(sessionAttributes)

    return handlerInput.responseBuilder
    .speak(prompts)
    .reprompt(prompts)
    .getResponse()
}

module.exports = QuestionResponder