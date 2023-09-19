const express = require("express");
const https = require('https')
//const axios = require('axios');

const { XMLParser } = require('fast-xml-parser');
const { decode } = require('metar-decoder');

const parser = new XMLParser();


const metarRoute = express.Router();
metarRoute.get("/", (req, res) => {
    //res.sendFile(__dirname, + "index.html")   
})
//metar?station=<code>
metarRoute.post("/", (req, res) => {
    const city = req.body.cityName
    const appiKey = "Your API Key"
    const unit = req.body.unit
    //Consultamos a la API de NOAA
    const url = 'https://www.aviationweather.gov/adds/dataserver_current/httpparam?dataSource=metars&requestType=retrieve&format=xml&stationString=' + station + '&hoursBeforeNow=1';
    
    //const response = await axios.get(url);
    
    https.get(url, (response) => {
        response.on("data", (chunk) => {
            //Manejar el response
            //Convertimos el XML obtenido a JSON, por conveniencia
            const parsed = parser.parse(response.data);
            //Decodificamos el METAR
            decode(parsed.response.data.METAR.raw_text);
            res.write("Response format")
            res.send()
        })
    })
})
module.exports = metarRoute