import './styles/scss/index.scss';
import L from 'leaflet';
import _ from 'lodash';
import axios from "axios";


const app = document.getElementById('root');
const heading = document.createElement('h1');
heading.textContent = "Global Air Pollution";

const container = document.createElement('div');
container.setAttribute('class', 'container');

const geoBtn = document.createElement('button');
geoBtn.innerText = 'Your Position';
geoBtn.setAttribute('class', 'geo-btn');

// Create a form dynamically
const form = document.createElement("form");
form.setAttribute("method", "get");
form.setAttribute("action", "submit");
form.setAttribute("id", "form");

// Create an input element for City
const cityInput = document.createElement("input");
cityInput.setAttribute("type", "text");
cityInput.setAttribute('id', 'city-input');
cityInput.setAttribute("placeholder", "Enter city");

// create a submit button
const sendBtn = document.createElement("input");
sendBtn.setAttribute("type", "submit");
sendBtn.setAttribute("value", "submit");
sendBtn.setAttribute('class', 'send-btn');

app.append(heading);
app.append(container);
form.append(cityInput);
form.append(sendBtn);
container.append(geoBtn);
document.getElementsByTagName("body")[0].appendChild(form);


//create a map with Leaflet
const mymap = L.map('mapid').setView([0, 0], 2);
const marker = L.marker([20.7, 90.5]).addTo(mymap);

const attribution = '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>';
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, { attribution });

tiles.addTo(mymap);





//Get User location
const succesCallback = async(position) => {

    const { latitude, longitude } = position.coords;

    try {

        const response = await axios.get('https://api.waqi.info/feed/geo:${latitude};${latitude}/?token=${process.env.API_KEY}');
        console.log(response.data);


    } catch (err) {

        console.error(err);

    }

    //Leaflet marker gets lat and lon data
    marker.setLatLng([latitude, longitude]).addTo(mymap);
};


const errorCallback = (error) => {

    console.error(error)

};


const getUserLocation = () => {

    navigator.geolocation.getCurrentPosition(succesCallback, errorCallback);

}








// const responseGetLoadash = _.get(responseData, 'data.data.city.name', 'not found')
// console.log(responseGetLoadash)

// if (responseGetLoadash == error) {
//     aquiResult = document.getElementById('h2').innerHTML = error

// } else {
//     resultPollution(resposeData);
// }




//Get data from API call
const requestPollution = async() => {

    const API_KEY = process.env.API_KEY

    try {
        const response = await axios.get('https://api.waqi.info/search/?keyword=${keyword}&token=${process.env.API_KEY}');
        console.log(response.data);
        // const responseGetLoadash = _.get(response, 'data.data.city.name', 'not found')
        // console.log(responseGetLoadash);

    } catch (err) {

        console.error(err);
    }
};



cityInput.addEventListener('submit', requestPollution);
sendBtn.addEventListener('click', requestPollution);
geoBtn.addEventListener('click', getUserLocation);