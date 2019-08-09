const config = require('../config/dev')
const fetch = require('node-fetch')

async function fetchWeather(zipcode) {
    const query = `units=imperial&zip=${zipcode},us&appid=${config.open_weather_api_key}`
    const url = `http://api.openweathermap.org/data/2.5/weather?${query}`
    const response = await fetch(url, {
        headers: { 'Content-Type': 'application/json' },
    })
    return response.json()
}

module.exports = fetchWeather