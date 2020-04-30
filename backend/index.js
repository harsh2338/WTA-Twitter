const express = require("express");
const mongo = require("mongoose");
const tweets = require("./routes/tweets");
const bodyParser = require("body-parser");
const cors = require("cors");

const PORT = 3000

const app = express();
app.listen(PORT,()=>console.log("listening at 3000"));

app.use(bodyParser.json());
app.use(cors());
app.use("/tweets",tweets.router);

// const uri = 'mongodb+srv://wta-admin:admin123@cluster0-rue61.mongodb.net/test?retryWrites=true&w=majority'
// mongo.connect(uri,{useNewUrlParser:true,useUnifiedTopology:true},()=> {
//     console.log("connected to db");
// });