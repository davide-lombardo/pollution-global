import './styles/scss/index.scss';
import axios from "axios";


const app = document.getElementById('root');
const heading = document.createElement('h1');
heading.textContent = "Global Air Pollution";

const container = document.createElement('div');
container.setAttribute('class', 'container');

const latitude = document.createElement('span');
latitude.setAttribute('class', 'lat-input');

const longitude = document.createElement('span');
longitude.setAttribute('class', 'lon-input');


app.append(heading);
app.append(container);
container.append('latitude');
container.append('longitude');


//Leaflet map
const mymap = L.map('mapid').setView([0, 0], 1);

const attribution = '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>';
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, { attribution });

tiles.addTo(mymap);



//API call
// (async function requestPollutionData() {

//     const API_KEY = process.env.API_KEY

//     const response = await fetch(`https://api.waqi.info/feed/geo:${lat};${lon}/token=${API_KEY}`)
//     const data = await response.json()

//     console.log(data)
// })();





(async() => {

    const API_KEY = process.env.API_KEY

    const response = await axios.get(`https://api.waqi.info/feed/geo:${lat};${lon}/token=${process.env.API_KEY}`)
    const data = await response.data

    console.log(data)
})();