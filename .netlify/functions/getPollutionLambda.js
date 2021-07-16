const axios = require("axios");


exports.handler = async(url) => {

    try {

        const API_KEY = process.env.API_KEY;
        // const lat = url.queryStringParameters.lat;
        // const long = url.queryStringParameters.long;

        // const city = url.queryStringParameters.city;
        // const cityNameData = response.data.data[0].station.name;
        // const cityAqi = response.data.data[0].aqi;
        const response = await axios.get(url);

        if (response.data.status === "ok") {

            const { data } = await response.data;

            // const data = {
            //     name: response.data.data.city.name,
            //     aqi: response.data.data.aqi
            // };

            // const data = {
            //     name: cityNameData,
            //     aqi: cityAqi
            // };

        }

        if (response.data.data === "Over quota") alert("Quota limit reached");
        if (response.data.data === "Invalid key") alert("Invalid API key");
        if (response.data.data === "Unknown station") alert("The station you entered is unknown, please enter another one.");

    } catch (error) {

        console.error(`${error.name}: ${error.message}`);

    }

    return {
        statusCode: 200,
        body: JSON.stringify(data)
    };
}