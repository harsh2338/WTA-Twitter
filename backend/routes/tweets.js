const express = require("express");
const Tweet = require("../models/tweetSchema")
const twit_api = require('../services/twit_api');
const sent_api = require('../services/sent_api');
const router = express.Router();




router.get("/",async(req,res)=>{
    let tweets = [];
    if(req.query.tag.startsWith('@')){
        tweets = await twit_api.get_user_tweets(req.query.tag, req.query.maxTweets);
    }
    else{
        tweets = await twit_api.get_tweets(req.query.tag, req.query.maxTweets);
    }
    await sent_api.tweets_analyzer(tweets);
    return res.json(tweets);
});

module.exports = router;