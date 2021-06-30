const { response, json } = require('express');
const express = require('express');
const cors = require('cors');


// var fs = require('fs');
const app = express();
const fetch = require('node-fetch')
app.use(cors());
app.use(express.json());



app.get('/', (req, res) => {
    res.json({ message: "Hey Done!" })
})

const isValidMew = (totalFormData) => {
    return totalFormData.country && totalFormData.country.toString().trim() !== ''
}

app.post('/goldboot', (req, res) => {
    if (isValidMew(req.body)) {
        const playerName = {
            name: req.body.country
        }
        console.log(">>>", playerName);
    } else {
        res.status(422);
        res.json({
            message: "Need a player name!"
        })
    }
    console.log("Req Body: ", req.body);
})

app.post('/weather', async function (req, res) {
    console.log("REQ", req.body.country);
    const api_url =
        "https://api.openweathermap.org/data/2.5/weather?lat=31.5085&lon=0.1257&appid=6dfbdd4309772888b6661bd5132a9893";
    const fetch_response = await fetch(api_url);
    // console.log(typeof fetch_response);
    const weatherData = await fetch_response.json();
    // console.log(weatherData);
    res.json(weatherData);
});

app.get('/weather', async function (req, res) {
    const api_url =
        "https://api.openweathermap.org/data/2.5/weather?lat=31.5085&lon=0.1257&appid=6dfbdd4309772888b6661bd5132a9893";
    const fetch_response = await fetch(api_url);
    // console.log(typeof fetch_response);
    const weatherData = await fetch_response.json();
    // console.log(weatherData);
    res.json(weatherData);
    // res.json({ message: "WEATHER" })
})

app.get('/goldenboot', async function (req, res) {
    const gboot_api_url =
        "https://mobile.guardianapis.com/sport/football/competitions/750/golden-boot"
    const fetch_response = await fetch(gboot_api_url);
    const scorers = await fetch_response.json();

    // console.log(scorers);
    // const swiss = scorers.filter(a => a.country == "Belgium")
    const swiss1 = scorers.filter(a => a.name == req.body)
    const swiss = scorers

    console.log("SWISS CHEESE", swiss);
    res.json(swiss);
});

app.listen(5000, () => {
    console.log('Listening on port 5000');
})