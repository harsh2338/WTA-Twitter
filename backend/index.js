const express = require("express");
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);



require('./config/database_config');

const bodyParser = require("body-parser");
const cors = require("cors");

require('./services/stream')(io);

const tweets = require("./routes/tweets");
const auth = require('./routes/auth');

const PORT = 3000
server.listen(PORT, () => console.log("listening at", PORT));



app.use(bodyParser.json());
app.use(cors());

app.use("/tweets", tweets);
app.use("/auth", auth);
app.get("/stream", (req, res) => { res.sendFile(__dirname + '/public/client.html') });