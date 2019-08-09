const assert = require('chai').assert
const va = require("virtual-alexa")
const RESPONSE_SOUND = require('../src/utils/constants').RESPONSE_SOUND

const alexa = va.VirtualAlexa.Builder()
    .handler("./src/app.handler") // Lambda function file and name
    .interactionModelFile("../../models/en-US.json") // Path to interaction model file
    .create()

    alexa.context().setAccessToken(process.env.ACCESS_TOKEN)
    
describe('Main Tests', function() {
    var result

    it('Welcome', async () => {
        result = await alexa.launch()
        assert.include(result.prompt(), constants.WELCOME_PROMPT)
    })

    it('Ask What to Wear', async () => {
        result = await alexa.utter('What should I wear? ')
        assert.include(result.prompt(), `<speak>Wear a rain coat, it will be pouring today. Don't forget your umbrella! <audio src=${RESPONSE_SOUND}/></speak>`)
    })

    it('Log Reminder', async () => {
        // Utterance: "Remind me to write in my journal tonight. "
        const request = await alexa.request()
            .intent("RemindIntent")
            .slot("action", "remind")
            .dialogState("STARTED")

        assert.include(request.prompt(), `<speak>Sure thing, boss. <audio src=${RESPONSE_SOUND}></speak>`)
    })
})