const axios = require("axios");

exports.handler = async function(event, context) {
    const API_KEY = process.env.API_KEY;
    const city = event.queryStringParameters.city;
    const response = await axios.get(`https://api.waqi.info/search/?token=${API_KEY}&keyword=${city}`);
    const cityNameData = response.data.data[0].station.name;
    const cityAqi = response.data.data[0].aqi;
    const data = {
        name: cityNameData,
        aqi: cityAqi
    };

    return {
        statusCode: 200,
        body: JSON.stringify(data)
    };
}