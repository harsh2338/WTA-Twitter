const mongo = require("mongoose");

const tweetSchema = mongo.Schema({
    text : {
        type : String,
        required : true
    },
    user : String,
    created_at : Date,
    score : Number,
    location : String
})

module.exports = mongo.model('Tweet',tweetSchema);