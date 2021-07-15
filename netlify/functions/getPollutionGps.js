const axios = require("axios");

exports.handler = async function(event, context) {
    const API_KEY = process.env.API_KEY;
    const lat = event.queryStringParameters.lat;
    const long = event.queryStringParameters.long;
    const response = await axios.get(`https://api.waqi.info/feed/geo:${lat};${long}/?token=${API_KEY}`);
    const data = {
        name: response.data.data.city.name,
        aqi: response.data.data.aqi
    };

    return {
        statusCode: 200,
        body: JSON.stringify(data)
    };
}