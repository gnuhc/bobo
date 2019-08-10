const { askForAddressPermissions, getEmail } = require('../utils/permissions')
const { checkAddress } = require('../utils/util')

const prompts = require('../utils/prompts')
const constants = require('../utils/constants').constants
const table = require('../utils/db').table
const Weather = require('../model/Weather')

async function QuestionResponder(handler) {
    // Get session attributes
    const attributes = handler.sessionAttributes

    var address, prompt = ``

    // Check address permissions
    address = await askForAddressPermissions(handlerInput)

    // If permissions denied
    if (! checkAddress(address))
        return handler.askPermission()

    // Location information was never registered to user's Alexa Account
    if (! address.postalCode)
        return handler.end(prompts.REGISTER_DEVICE)

    // Create Weather instance
    var weatherObject = new Weather()

    var [ email, weather ] = await Promise.all([
        // Get user email
        getEmail(),
        // Get weather pertaining to user location
        weatherObject.fetchWeather(address.postalCode)
    ])

    // Failed to retrieve user email address
    if (! email)
        return handler.end(prompts.EMAIL_NOT_FOUND)

    // Failed to retrieve user weather data
    if (! weather)
        prompt += prompts.WEATHER_NOT_FOUND

    // Get user data from database
    var user = await table.get(email)

    // Failed to retrieve user from database
    if (! user)
        return handler.end(prompts.USER_NOT_FOUND)

    /* Do things with user data and weather data... */

        // Previous advice was given
        if (user.previous)
            // Make a reference to last weather condition
            prompt += weather.getPreviousPrompt(user.previous)
        // Add new advice to dialogue
        prompt += weather.getWeatherAdvice()
        prompt += prompts.AFTER_REPLY

        user.previous = weather.getCondition()

    // Store current weather condition in user database
    await table.put(user)

    // Set state of skill
    attributes.STATE = 'STATE_AFTER_REPLY'
    handler.setSessionAttributes()

    return handler.respond(prompt)
}

module.exports = QuestionResponder