const mongo = require("mongoose");
require('dotenv').config()
const uri = `mongodb+srv://${process.env.DB_ADMIN}:${process.env.DB_ADMIN_PASSWORD}@cluster0-rue61.mongodb.net/test?retryWrites=true&w=majority`;
mongo.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("connected to db");
});