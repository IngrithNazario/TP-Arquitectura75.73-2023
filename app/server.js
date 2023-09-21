const express = require("express");
const bodyParser = require("body-parser")
const metarRouter = require("./routes/metar");
const pingRouter = require("./routes/ping");
const spaceFlightRouter = require("./routes/spaceFlight");

const PORT = 3000;
const TIMEOUT = 5*1000;
const app = express();

app.use(express.static("client"));
app.use(bodyParser.urlencoded({extended: false}));

app.use("/ping", pingRouter);
app.use("/metar?station=code", metarRouter);
app.use("/spaceflight_news", spaceFlightRouter);

app.listen(PORT, () => { console.log(`Server running at :${PORT}`)});