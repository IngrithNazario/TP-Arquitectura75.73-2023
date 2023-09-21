const express = require("express");

const pingRoute = express.Router();
const PING = 'Ping';

pingRoute.get('/', (req, res) => {
    res.send({
        "response": PING,
        "code": 200
    });
});

module.exports = pingRoute