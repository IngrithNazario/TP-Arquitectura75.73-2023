const express = require("express");
const bodyParser = require("body-parser")
const metarRouter = require("./routes/metar");
const pingRouter = require("./routes/ping");

const PORT = 3000;
const PING = 'Ping';
const TIMEOUT = 5*1000;

const app = express();


app.use(express.static("client"));
app.use(bodyParser.urlencoded({extended: true}));

app.use("/ping", pingRouter);
app.use("/metar", metarRouter); //falta definir la ruta

app.listen(PORT, () => { console.log(`Server running at :${PORT}`)});