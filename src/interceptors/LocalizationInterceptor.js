const i18n = require('i18next')
const sprintf = require('i18next-sprintf-postprocessor')

const languageStrings = {
    en: {
        translation: {
            WELCOME: 'Hi there, and welcome to the Capital Blue Cross.',
            HELP: 'You asked for help',
            STOP: 'Okay, see you next time!',
        },
    },
    // , 'de-DE': { 'translation' : { 'TITLE'   : "Local Helfer etc." } }
}

const LocalizationInterceptor = {
    process(handlerInput) {
        const localizationClient = i18n.use(sprintf).init({
            lng: handlerInput.requestEnvelope.request.locale,
			overloadTranslationOptionHandler: sprintf.overloadTranslationOptionHandler,
			resources: languageStrings,
            returnObjects: true,
        })

        const attributes = handlerInput.attributesManager.getRequestAttributes()
        attributes.t = function (...args) {
            return localizationClient.t(...args)
        }
    },
}

module.exports = LocalizationInterceptor