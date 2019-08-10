const config = require('../../config/dev')

const WEATHER_TYPE = {
    HOT: "You better wear a tank top and get your sunblock ready, be ready to get scorched! ",
    WARM: "A t-shirt should be fine. ",
    FAIR: "Wear whatever you'd like. Bring a light jacket in case it gets colder at night. ",
    CHILLY: "Get that hoody ready, you'll want stay warm when you're outside",
    FROSTY: "Wear at least three layers, you'll not want to stay outside today. ",
    NONE: "Not sure on my end, please take your best guess. "
}

class Weather {

    constructor() {
        this.weather = {}
    }

    async fetchWeather(postalCode) {
        this.postalCode = postalCode
        // Set up url for request
        const url = `http://api.openweathermap.org/data/2.5/weather?` +
                    `units=imperial&zip=${postalCode},us&appid=${config.open_weather_api_key}`
        const response = (await fetch(url, {
            headers: { 'Content-Type': 'application/json' },
        })).json()

        // Set reference to retrieved weather information
        this.weather.today = {
            description: response.weather[0].description,
            min: response.main.temp_min,
            max: response.main.temp_max
        }
    }

    async getTemperature() {
        if (this.weather.today && 
                this.weather.today.min && 
                    this.weather.today.max)
            return {
                min: this.weather.today.min,
                max: this.weather.today.max
            }
        return null
    }

    getWeatherAdvice() {
        var max, type

        if (this.weather.today && this.weather.today.max)
            max = this.weather.today.max
        else
            return WEATHER_TYPE.NONE

        var advice = `For today, `

        switch (true) {
            case (max >= 90) :
                type = 'HOT'
                advice += WEATHER_TYPE.HOT
                break;
            case (max >= 80) :
                type = 'WARM'
                advice += WEATHER_TYPE.WARM
                break;
            case (max >= 70) :
                type = 'FAIR'
                advice += WEATHER_TYPE.FAIR
                break;
            case (max >= 60) :
                type = 'CHILLY'
                advice += WEATHER_TYPE.CHILLY
                break;
            case (max >= 50) :
                type = 'FROSTY'
                advice += WEATHER_TYPE.FROSTY
                break;
            default:
                type = 'FAIR'
                advice += WEATHER_TYPE.FAIR
        }

        this.condition = type
        this.advice = advice

        return advice
    }

    getPreviousPrompt(condition) {
        return `Last time I spoke to you, the weather was ${condition}. `
    }

    getCondition() {
        if (this.condition)
            return this.condition
        return null
    }
}

module.exports = Weather