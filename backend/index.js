const express = require("express");
const app = express();
const socketsio = require('socket.io');

require('./config/database_config');

const bodyParser = require("body-parser");
const cors = require("cors");

const tweets = require("./routes/tweets");
const auth = require('./routes/auth');

const PORT = 3000
const server = app.listen(PORT,()=>console.log("listening at", PORT));
const io = socketsio(server);
require('./services/stream')(io);

app.use(bodyParser.json());
app.use(cors());

app.use("/tweets",tweets);
app.use("/auth",auth);
app.get("/stream",(req,res)=>{res.sendFile(__dirname + '/public/client.html')});



