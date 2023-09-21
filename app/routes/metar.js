const express = require("express");
const axios = require('axios');

const { XMLParser } = require('fast-xml-parser');
const { decode } = require('metar-decoder');

const parser = new XMLParser();
const metarRoute = express.Router();

metarRoute.get("/metar", (req, res) => {
    let station = req.query.station;
    console.log(station);
    //Consultamos a la API de NOAA
    const url = 'https://www.aviationweather.gov/adds/dataserver_current/httpparam?dataSource=metars&requestType=retrieve&format=xml&stationString=' + station + '&hoursBeforeNow=1';
    getMetar(url, res);
})

async function getMetar(url, res) {
    try {
        const response = await axios.get(url);
        let jsArrayData = [];
        let detail;
        let code;
        if (response.data) {
            detail = "Station found.";
            code = 200;
            const parsed = parser.parse(response.data);
            const data = parsed.response.data.METAR; //puede ser un jsonObject o un JsonArray con mucha data
            if (Array.isArray(data)) {
                data.forEach(element => {
                    jsArrayData.push(decode(element.raw_text));
                });
            } else {
                jsArrayData.push(decode(data.raw_text));
            }
        } else {
            detail = "Station not found.";
            code = 100
        }
        res.send({
            "response": detail,
            "code": code,
            "data": jsArrayData
        });
    } catch (error) {
        console.log(error);
        res.send({
            "response": "Error on process METAR.",
            "code": 500,
            "data": []
        })
    }
}

module.exports = metarRoute