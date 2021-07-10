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

const latSpan = document.createElement('p');
latSpan.innerHTML = "<p>latitude: <span id='lat'></span><br/>longitude: <span id='lon'></span></p>"

app.append(heading);
app.append(container);
form.append(cityInput);
form.append(sendBtn);
container.append(geoBtn);
container.append(latSpan);
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

        const response = await axios.get('https://api.waqi.info/feed/geo:${latitude};${longitude}/?token=${process.env.API_KEY}');
        marker.setLatLng([latitude, longitude]).addTo(mymap);
        console.log(response);



        document.getElementById('lat').textContent = latitude.toFixed(2);
        document.getElementById('lon').textContent = longitude.toFixed(2);


    } catch (err) {

        console.error(err);

    }

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
    const keyword = document.getElementById('city-input').value;


    try {
        const response = await axios.get('https://api.waqi.info/search/?keyword=${keyword}&token=${process.env.API_KEY}');
        console.log(response.data);
        //const responseGetLoadash = _.get(response, 'data.data.city.name', 'not found')
        //console.log(responseGetLoadash);

    } catch (err) {

        console.error(err);
    }
};



cityInput.addEventListener('submit', requestPollution);
sendBtn.addEventListener('click', requestPollution);
geoBtn.addEventListener('click', getUserLocation);