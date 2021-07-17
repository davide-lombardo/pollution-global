const API_KEY = process.env.API_KEY
import '../scss/index.scss';
import L from 'leaflet';
import axios from "axios";


const app = document.getElementById('root');
const heading = document.createElement('h1');
heading.textContent = "Global Air Pollution";


const container = document.createElement('div');
container.setAttribute('class', 'container');


const mapDiv = document.createElement('div');
mapDiv.setAttribute('id', 'mapid');


const form = document.createElement("form");
form.setAttribute("id", "form");


const searchBar = document.createElement("input");
searchBar.setAttribute("type", "text");
searchBar.setAttribute('id', 'search-bar');
searchBar.setAttribute("placeholder", "Enter city");


const sendBtn = document.createElement("button");
sendBtn.setAttribute("type", "submit");
sendBtn.setAttribute('id', 'send-btn');
sendBtn.innerText = 'Submit';

const geoBtn = document.createElement('button');
geoBtn.setAttribute('class', 'geo-btn fas fa-map-marked-alt');


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


class Station {

    constructor() {

        let data = {
            name: "",
            pm10: "",
            co: "",
            no2: "",
            score: "",
        };
    }

    setScore() {

        const { pm10 } = this.data;
        let score = "";
        if (pm10 === "N/A") score = "Info unavailable";
        if (pm10 >= 0 && pm10 <= 50) score = "Good";
        if (pm10 >= 51 && pm10 <= 100) score = "Moderate";
        if (pm10 >= 101 && pm10 <= 150) score = "Unhealthy for sensitive people";
        if (pm10 >= 151 && pm <= 200) score = "Unhealthy";
        if (pm10 >= 201 && pm10 <= 300) score = "Very unhealthy";
        if (pm10 >= 301 && pm10 <= 500) score = "Hazardous";

        this.data = {...this.data, score };

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
                baseUrl += `/?token=${API_KEY}`
            } else {
                alert("Please insert a valid value");
            }

        }

        if (args.length === 2) {

            baseUrl += `geo:${args[0]};${args[1]}`;
            baseUrl += `/?token=${API_KEY}`;

        }

        this.callLambdaPollution(baseUrl);

    }

    async callLambdaPollution(lat, long) {

        try {

            const response = await axios.get("/.netlify/functions/getPollutionLambda", {
                params: {

                    lat: lat,
                    long: long
                }
            });

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
                this.setScore();
                this.setDocument();

                const latitude = data.city.geo[0];
                const longitude = data.city.geo[1];

                marker.setLatLng([latitude, longitude]).addTo(mymap);

            }

            if (response.data.data === "Over quota") alert("Quota limit reached");
            if (response.data.data === "Invalid key") alert("Invalid API key");
            if (response.data.data === "Unknown station") alert("The station you entered is unknown, please enter another one.");

        } catch (error) {

            console.error(`${error.name}: ${error.message}`);

        }
    }

    setDocument() {

        function htmlToElement(html) {

            let template = document.createElement('template');
            html = html.trim();
            template.innerHTML = html;
            return template.content.firstChild;

        }
        if (!document.querySelector("#response")) {

            const responseDiv = htmlToElement(

                `<div id="response">
                <div class="ico aqi-index-city fas fa-city"></div>
                <div class="ico aqi-index-text fas fa-tachometer-alt"></div>
                <div class="ico co2 fas fa-cloud"></div>
                <div class="ico no2 fas fa-cloud"></div>
                <div class="ico score fas fa-traffic-light"></div>
              </div>`);

            container.append(responseDiv);

        }

        const aqi = document.querySelector('.aqi-index-text');
        const city = document.querySelector('.aqi-index-city');
        const co2 = document.querySelector('.co2');
        const no2 = document.querySelector('.no2');
        const score = document.querySelector('.score');

        city.textContent = this.data.name;
        aqi.textContent = this.data.pm10;
        co2.textContent = this.data.co2;
        no2.textContent = this.data.no2;
        score.textContent = this.data.score;

    }
}

const cityData = new Station();



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