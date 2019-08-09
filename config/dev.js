module.exports = {
    aws: {
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
        region: process.env.REGION,
        endpoint: process.env.DB,
        apiVersion: process.env.API_VERSION
    },
    open_weather_api_key: process.env.OPEN_WEATHER_API_KEY
}