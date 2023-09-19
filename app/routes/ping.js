const express = require("express");
//const properties = require("../../package.json");

const pingRoute = express.Router();
const PING = 'Ping';

pingRoute.get('/', (req, res) => {
    res.send(PING);
});

module.exports = pingRoute