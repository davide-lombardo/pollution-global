const axios = require('axios');
const qs = require('qs');

exports.handler = async function(event, context, callBack) {

    const API_PARAMS = qs.stringify(event.queryStringParameters)
    const { API_KEY, API_URL } = process.env
    const URL = `${API_URL}?${API_PARAMS}&key${API_KEY}`


    // Let's log some stuff we already have.
    console.log("Injecting token to", API_URL);
    console.log("logging event.....", event)
    console.log("Constructed URL is ...", URL)

    // Here's a function we'll use to define how our response will look like when we call callback
    const pass = (body) => {
        callback(null, {
            statusCode: 200,
            body: JSON.stringify(body)
        })
    }

    // Perform the API call.
    const get = () => {
        axios.get(URL)
            .then((response) => {
                console.log(response.data)
                pass(response.data)
            })
            .catch(err => pass(err))
    }
    if (event.httpMethod == 'GET') {
        get()
    };
};