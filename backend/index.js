const express = require("express");
const app = express();
const server = require('http').Server(app);

require('./config/database_config');

const io = require('socket.io')(server)
const bodyParser = require("body-parser");
const cors = require("cors");

const tweets = require("./routes/tweets");
const auth = require('./routes/auth');

const PORT = 3000
server.listen(PORT,()=>console.log("listening at 3000"));

app.use(bodyParser.json());
app.use(cors());

app.use("/tweets",tweets);
app.use("/auth",auth);

// app.get("/sockets",(req,res)=>{res.sendFile(__dirname + '/public/client.html')});

// let ts;
// io.on('connection', function (client) {
//     console.log('connected')

//     client.on('rec',(data)=>{
//         let stream = T.stream('statuses/filter', { track: data, language : 'en'});
//         stream.on('tweet', (tweet)=>{
//             console.log(tweet.text)
//             client.emit('stream', {tweet})
//         });
//         stream.stop();
//     })

//     client.on('disconnect', ()=>{
//         if(ts)ts.stop();
//         console.log('disconnected')
//     })
// });

