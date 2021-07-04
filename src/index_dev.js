import './styles/scss/index.scss';

const app = document.getElementById('root')
const heading = document.createElement('h1');
heading.textContent = "Global Air Pollution";

const container = document.createElement('div')
container.setAttribute('class', 'container')


app.append(heading);





(async function requestPollutionData() {
    // la nostra chiave è al sicuro nelle Environment Variables
    const API_KEY = process.env.API_KEY

    // la parola chiave è await: è quella che dice a JS di fermarsi a questa riga finchè la fetch API non restituisce il risultato della richiesta
    const response = await fetch(`https://api.waqi.info/feed/geo:${lat};${lon}/token=${API_KEY}`)
    const data = await response.json()

    console.log(data) // facciamo ciò che vogliamo con i dati ottenuti: scelta, elaborazione, visualizzazione..
})();