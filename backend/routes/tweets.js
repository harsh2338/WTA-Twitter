const express = require("express");
const Tweet = require("../models/tweetSchema")
const sentiment_analyzer = require('../services/sent_analysis');
const router = express.Router();

router.get("/",async(req,res)=>{
    const data = await sentiment_analyzer.sa(req.query.tag,req.query.maxTweets);
    res.json(data);
});

module.exports = router;