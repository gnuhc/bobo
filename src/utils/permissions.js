const fetch = require('node-fetch')
const baseURL = 'https://api.amazonalexa.com'

// const resetAttributes = function (handlerInput) {
//     const array = [
//       ''
//     ]
//     const sessionAttributes = handlerInput.attributesManager.getSessionAttributes()
//     array.map((item) => {
//         sessionAttributes[item] = ''
//     })
//     handlerInput.attributesManager.setSessionAttributes(sessionAttributes)
//     return
// }

async function askForAddressPermissions(handlerInput) {

    var apiAccessToken = handlerInput.requestEnvelope.context.System.apiAccessToken
    var deviceId = handlerInput.requestEnvelope.context.System.device.deviceId
    var headers = {
        Authorization: 'Bearer ' + apiAccessToken,
        'content-type': 'application/json'
    }

    try {
        var address_callback = await fetch(baseURL + `/v1/devices/${deviceId}/settings/address/countryAndPostalCode`, { headers: headers})
        var address = await address_callback.json()
        return address
    }
    catch(err) {
        console.log(err)
        return null
    }
}

async function getEmail(handlerInput) {

    var apiAccessToken = handlerInput.requestEnvelope.context.System.apiAccessToken
    var headers = {
        Authorization: 'Bearer ' + apiAccessToken,
        'content-type': 'application/json'
    }
    try {
        var email_callback = await fetch(baseURL + `/v2/accounts/~current/settings/Profile.email`, { headers: headers})
        var email = await email_callback.json()
        return email
    }
    catch(err) {
        console.log(err)
        return null
    }
}

exports.askForAddressPermissions = askForAddressPermissions
exports.getEmail = getEmail