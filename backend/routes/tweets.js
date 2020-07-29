const express = require("express");
const Tweet = require("../models/tweetSchema");
const User = require("../models/userSchema");
const twit_api = require('../services/twit_api');
const sent_api = require('../services/sent_api');
const check_auth = require('../middlewares/check_auth')
const router = express.Router();

router.get("/",check_auth, async(req,res)=>{
    let tweets = [];
    if(req.query.tag.startsWith('@')){
        tweets = await twit_api.get_user_tweets(req.query.tag, req.query.maxTweets);
    }
    else{
        tweets = await twit_api.get_tweets(req.query.tag, req.query.maxTweets);
    }
    await sent_api.tweets_analyzer(tweets);
    User.updateOne({_id : req.user.id}, {$push : {recent : req.query.tag}}).then(user=>{});
    return res.json(tweets);
});

module.exports = router;

// router.post("/login", (req, res, next) => {
//     User.findOne({email : req.body.email})
//     .then(user => {
//         if(!user)
//             return res.status(401).json({
//                 message: "Auth failed"
//             });

//         bcrypt.compare(req.body.password,user.password,(err, result) => {
//             if(err)
//                 return res.status(401).json({
//                     message: "Auth failed"
//                 });
//             if(!result)
//                 return res.status(403).json({
//                     message: "Auth failed"
//                 });
//             const token = jwt.sign({email : user.email, name : user.name}, jwt_key, {expiresIn: "3h"});
//             return res.status(200).json({
//                 message: "Auth successful",
//                 token: token,
//             });
//         });
//     })
//     .catch(err => res.status(401).json({message : err}));
// });