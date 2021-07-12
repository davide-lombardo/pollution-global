const API_KEY = process.env.API_KEY
import './styles/scss/index.scss';
import L from 'leaflet';
import axios from "axios";



class Station {

    constructor() {

        let data = {
            name: "",
            pm10: "",
            co: "",
            no2: "",
            verdict: "",
        };
    }

    setVerdict() {

        const { pm10 } = this.data;
        let verdict = "";
        if (pm10 === "N/A") verdict = "Info unavailable";
        if (pm10 >= 0 && pm10 <= 50) verdict = "Good";
        if (pm10 >= 51 && pm10 <= 100) verdict = "Moderate";
        if (pm10 >= 101 && pm10 <= 150) verdict = "Unhealthy for sensitive people";
        if (pm10 >= 151 && pm <= 200) verdict = "Unhealthy";
        if (pm10 >= 201 && pm10 <= 300) verdict = "Very unhealthy";
        if (pm10 >= 301 && pm10 <= 500) verdict = "Hazardous";

        this.data = {...this.data, verdict };

    }


    setData(newObj) {

        if (newObj) {
            this.data = {...newObj };
        }

    }


    manageInput(e, ...args) {

        e.preventDefault();
        let baseUrl = "https://api.waqi.info/feed/";

        if (args.length === 1) {

            if (args[0]) {
                baseUrl += `${args[0]}`;
                searchBar.value = "";
                baseUrl += `/?token=${API_KEY}`;
            } else {
                alert("Please insert a valid value");
            }

        }

        if (args.length === 2) {

            baseUrl += `geo:${args[0]};${args[1]}`;
            baseUrl += `/?token=${API_KEY}`;

        }

        this.getResponse(baseUrl);

    }

    async getResponse(url) {

        try {

            const response = await axios.get(url);

            if (response.data.status === "ok") {
                const { data } = await response.data;

                const newObj = {
                    name: data.city.hasOwnProperty("name") ?
                        data.city.name : "N/A",
                    pm10: data.iaqi.hasOwnProperty("pm10") ?
                        data.iaqi.pm10.v : "N/A",
                    co2: data.iaqi.hasOwnProperty("co") ?
                        `${data.iaqi.co.v} µg/m3 (co2)` : "N/A",
                    no2: data.iaqi.hasOwnProperty("no2") ?
                        `${data.iaqi.no2.v}  µg/m3 (no2)` : "N/A",
                };

                this.setData(newObj);
                this.setVerdict();
                this.setDocument();

            }

            if (response.data.data === "Over quota") alert("Quota limit reached");
            if (response.data.data === "Invalid key") alert("Invalid API key");
            if (response.data.data === "Unknown station") alert("The station you entered is unknown, please enter another one.");

        } catch (error) {

            console.error(`${error.name}: ${error.message}`);

        }
    }

    setDocument() {
        const responseDiv = document.createElement('div');
        responseDiv.setAttribute('id', 'response')
        const aqi = document.createElement('div');
        aqi.setAttribute('class', 'ico aqi-index-text fas fa-tachometer-alt');
        const no2 = document.createElement('div');
        no2.setAttribute('class', 'ico no2 fas fa-cloud');
        const co2 = document.createElement('div');
        co2.setAttribute('class', 'ico co2 fas fa-cloud');
        const city = document.createElement('div');
        city.setAttribute('class', 'ico aqi-index-city fas fa-city');
        const verdict = document.createElement('div');
        verdict.setAttribute('class', 'ico verdict fas fa-traffic-light');

        container.append(responseDiv);
        responseDiv.append(city);
        responseDiv.append(aqi);
        responseDiv.append(co2);
        responseDiv.append(no2);
        responseDiv.append(verdict);

        city.textContent = this.data.name;
        aqi.textContent = this.data.pm10;
        co2.textContent = this.data.co2;
        no2.textContent = this.data.no2;
        verdict.textContent = this.data.verdict;
    }
}


const cityData = new Station();


//create a title
const app = document.getElementById('root');
const heading = document.createElement('h1');
heading.textContent = "Global Air Pollution";

//create a container
const container = document.createElement('div');
container.setAttribute('class', 'container');

//create div for leaflet map
const mapDiv = document.createElement('div');
mapDiv.setAttribute('id', 'mapid');

//create a button for geolocalization
const geoBtn = document.createElement('button');
geoBtn.setAttribute('class', 'geo-btn fas fa-map-marked-alt');

// create a form dynamically
const form = document.createElement("form");
form.setAttribute("id", "form");

// create an input element
const searchBar = document.createElement("input");
searchBar.setAttribute("type", "text");
searchBar.setAttribute('id', 'search-bar');
searchBar.setAttribute("placeholder", "Enter city");

// create a submit button
const sendBtn = document.createElement("button");
sendBtn.setAttribute("type", "submit");
sendBtn.setAttribute('id', 'send-btn');
sendBtn.innerText = 'Submit';



//append elements to the dom
app.append(heading);
app.append(container);
app.append(mapDiv);
app.append(geoBtn);
app.append(form);
form.append(searchBar);
form.append(sendBtn);



//create a map with Leaflet
const mymap = L.map('mapid').setView([0, 0], 2);
const marker = L.marker([20.7, 90.5]).addTo(mymap);

const attribution = '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>';
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, { attribution });

tiles.addTo(mymap);




searchBar.focus();
form.addEventListener("submit", (e) => {


    cityData.manageInput(e, searchBar.value);

});


geoBtn.addEventListener("click", (e) => {

    navigator.geolocation.getCurrentPosition((position) => {

        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        cityData.manageInput(e, latitude, longitude);

        marker.setLatLng([latitude, longitude]).addTo(mymap);

    });
});