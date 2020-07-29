require('dotenv').config();




const twitter_keys = {
    consumer_key: process.env.TWIT_CONSUMER_KEY,
    consumer_secret: process.env.TWIT_CONSUMER_SECRET,
    access_token_key: process.env.TWIT_ACCESS_TOKEN,
    access_token_secret: process.env.TWIT_ACCESS_TOKEN_SECRET,
}


const twit_keys = {
    consumer_key: process.env.TWIT_CONSUMER_KEY,
    consumer_secret: process.env.TWIT_CONSUMER_SECRET,
    access_token: process.env.TWIT_ACCESS_TOKEN,
    access_token_secret: process.env.TWIT_ACCESS_TOKEN_SECRET,
}


const Twitter = new require('twitter')(twitter_keys);

const Twit = new require('twit')(twit_keys);

module.exports = {
    twitter_keys,
    twit_keys,
    Twitter,
    Twit
}