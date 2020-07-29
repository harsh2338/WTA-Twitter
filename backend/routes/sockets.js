// const express = require("express");
// const User = require("../models/userSchema");
// const bcrypt = require("bcrypt");
// const check_auth = require("../middlewares/check_auth");
// const jwt = require("jsonwebtoken");
// const jwt_key = require("../config/jwt_key")

// const router = express.Router();

// router.post("/signup", (req, res) => {
//     bcrypt.hash(req.body.password, 10, (err, hash) => {
//         if (err)
//             return res.status(500).json({ error: err });

//         user_data = {
//             name: req.body.name,
//             email: req.body.email,
//             password: hash
//         };
//         user = new User(user_data)
//         user.save()
//             .then((user) => {
//                 res.status(201).json({
//                     message: "User created",
//                     user
//                 });
//             })
//             .catch(err => res.status(409).json({ error: err }));
//     });
// });

// router.post("/login", (req, res, next) => {
//     User.findOne({ email: req.body.email })
//         .then(user => {
//             if (!user)
//                 return res.status(401).json({
//                     message: "Auth failed"
//                 });

//             bcrypt.compare(req.body.password, user.password, (err, result) => {
//                 if (err)
//                     return res.status(401).json({
//                         message: "Auth failed"
//                     });
//                 if (!result)
//                     return res.status(403).json({
//                         message: "Auth failed"
//                     });
//                 const token = jwt.sign({ id: user._id, email: user.email, name: user.name }, jwt_key, { expiresIn: "3h" });
//                 const username = user.name
//                 return res.status(200).json({
//                     message: "Auth successful",
//                     token,
//                     username
//                 });
//             });
//         })
//         .catch(err => res.status(401).json({ message: err }));
// });

// module.exports = router;

// const express = require("express");
// const Tweet = require("../models/tweetSchema");
// const User = require("../models/userSchema");
// const twit_api = require('../services/twit_api');
// const sent_api = require('../services/sent_api');
// const check_auth = require('../middlewares/check_auth')
// const router = express.Router();

// router.get("/",check_auth, async(req,res)=>{
//     let tweets = [];
//     if(req.query.tag.startsWith('@')){
//         tweets = await twit_api.get_user_tweets(req.query.tag, req.query.maxTweets);
//     }
//     else{
//         tweets = await twit_api.get_tweets(req.query.tag, req.query.maxTweets);
//     }
//     await sent_api.tweets_analyzer(tweets);
//     User.updateOne({_id : req.user.id}, {$push : {recent : req.query.tag}}).then(user=>{});
//     return res.json(tweets);
// });

// module.exports = router;

// const T = require('../config/twit_config').Twit;

// const tweet_metadata = ['created_at','id','full_text','geo','coordinates','place','retweet_count','favorite_count']
// const user_metadata = ['id','name','screen_name','location','profile_background_color','profile_background_image_url','profile_image_url']

// const process_tweets = (tweets)=>{
//     let processed_tweets = [];
//     for(let tweet of tweets){
//         let twt = {}
//         for(let tm of tweet_metadata)
//             twt[tm] = tweet[tm];
//         if('retweeted_status' in tweet)
//             twt['full_text'] = tweet.retweeted_status.full_text;
//         if('extended_tweet' in tweet)
//             twt['full_text'] = tweet.extended_tweet.full_text;
//         if(!twt['full_text']) twt['full_text'] = tweet.text;
//         twt['user'] = {};
//         for(let um of user_metadata)
//             twt['user'][um] = tweet['user'][um];
//         processed_tweets.push(twt);
//     }
//     return processed_tweets;
// }

// const get_tweets_helper = (hashtag,id,count,since_id = -1)=>{
//     return new Promise((resolve,reject)=>{ 
//         let params = {q: `${hashtag}`, count:count, lang:'en',tweet_mode : 'extended'};
//         if(id != -1)
//             params['max_id'] = `${id}`;
//         if(since_id != -1)params['since_id'] = `${since_id}`;
//         T.get("search/tweets",params,(err, data)=>{
//             if(err)return reject(err);
//             resolve(process_tweets(data.statuses));
//         });
//     });
// }

// const get_tweets = async (hashtag,max_tweets = 100,since_id = -1)=>{
//     let max_id = -1
//     let tweets = []
//     let total = 0
    
//     while(total < max_tweets){ 
//         var curr_tweets = []
//         curr_tweets = await get_tweets_helper(hashtag,max_id,max_tweets-total,since_id);
//         if(curr_tweets.length == 0) break;
//         total += curr_tweets.length;
//         tweets = tweets.concat(curr_tweets)
//         max_id = curr_tweets[curr_tweets.length-1].id
//     }
//     return tweets;
// }

// const get_user_tweets_helper = (user,count=200,max_id = -1,since_id = -1)=>{
//     return new Promise((resolve,reject)=>{
//         let params = {screen_name : user,count : count,tweet_mode : 'extended'};
//         if(since_id != -1)params['since_id'] = `${since_id}`;
//         if(max_id != -1)params['max_id'] = `${max_id}`;
//         T.get('statuses/user_timeline',params,(err,data)=>{
//             if(err)return reject(err);
//             resolve(process_tweets(data));
//         });
//     });
    
// }

// const get_user_tweets = async (user,max_tweets = 100,since_id=-1)=>{
//     let tweets = []
//     let total = 0
//     let max_id = -1
    
//     while(total < max_tweets){ 
//         var curr_tweets = []
//         curr_tweets = await get_user_tweets_helper(user,count = max_tweets-total,max_id = max_id,since_id);
//         if(curr_tweets.length == 0) break;
//         total += curr_tweets.length;
//         tweets = tweets.concat(curr_tweets)
//         max_id = curr_tweets[curr_tweets.length-1].id
//     }
//     return tweets;
// }

// module.exports = {
//     process_tweets,
//     get_tweets,
//     get_user_tweets,
// };


// @import url('https://fonts.googleapis.com/css?family=Poppins');

// /* BASIC */

// body {
//     font-family: "Poppins", sans-serif;
//     height: 100vh;
// }

// a {
//     color: #92badd;
//     display: inline-block;
//     text-decoration: none;
//     font-weight: 400;
// }

// h2 {
//     text-align: center;
//     font-size: 16px;
//     font-weight: 600;
//     text-transform: uppercase;
//     display: inline-block;
//     margin: 40px 8px 10px 8px;
//     color: #cccccc;
// }


// /* STRUCTURE */

// .wrapper {
//     display: flex;
//     align-items: center;
//     flex-direction: column;
//     justify-content: center;
//     width: 100%;
//     padding: 20px;
//     margin: 0;
//     position: absolute;
//     top: 50%;
//     -ms-transform: translateY(-50%);
//     transform: translateY(-50%);
// }

// #formContent {
//     -webkit-border-radius: 10px 10px 10px 10px;
//     border-radius: 10px 10px 10px 10px;
//     background: #fff;
//     padding: 30px;
//     width: 90%;
//     max-width: 450px;
//     position: relative;
//     padding: 0px;
//     -webkit-box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
//     box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
//     text-align: center;
// }

// #formFooter {
//     background-color: #f6f6f6;
//     border-top: 1px solid #dce8f1;
//     padding: 25px;
//     text-align: center;
//     -webkit-border-radius: 0 0 10px 10px;
//     border-radius: 0 0 10px 10px;
// }


// /* TABS */

// h2.inactive {
//     color: #cccccc;
// }

// h2.active {
//     color: #0d0d0d;
//     border-bottom: 2px solid #5fbae9;
// }


// /* FORM TYPOGRAPHY*/

// input[type=button],
// input[type=submit],
// input[type=reset] {
//     cursor: pointer;
//     background-color: #56baed;
//     border: none;
//     color: white;
//     padding: 15px 80px;
//     text-align: center;
//     text-decoration: none;
//     display: inline-block;
//     text-transform: uppercase;
//     font-size: 13px;
//     -webkit-box-shadow: 0 10px 30px 0 rgba(95, 186, 233, 0.4);
//     box-shadow: 0 10px 30px 0 rgba(95, 186, 233, 0.4);
//     -webkit-border-radius: 5px 5px 5px 5px;
//     border-radius: 5px 5px 5px 5px;
//     margin: 5px 20px 40px 20px;
//     -webkit-transition: all 0.3s ease-in-out;
//     -moz-transition: all 0.3s ease-in-out;
//     -ms-transition: all 0.3s ease-in-out;
//     -o-transition: all 0.3s ease-in-out;
//     transition: all 0.3s ease-in-out;
// }

// input[type=button]:hover,
// input[type=submit]:hover,
// input[type=reset]:hover {
//     background-color: #39ace7;
// }

// input[type=button]:active,
// input[type=submit]:active,
// input[type=reset]:active {
//     -moz-transform: scale(0.95);
//     -webkit-transform: scale(0.95);
//     -o-transform: scale(0.95);
//     -ms-transform: scale(0.95);
//     transform: scale(0.95);
// }

// input[type=submit]:disabled {
//     background-color: grey;
//     color: white;
// }

// input[type=text],
// input[type=password] {
//     background-color: #f6f6f6;
//     border: none;
//     color: #0d0d0d;
//     padding: 15px 32px;
//     text-align: center;
//     text-decoration: none;
//     display: inline-block;
//     font-size: 16px;
//     margin: 5px;
//     width: 85%;
//     border: 2px solid #f6f6f6;
//     -webkit-transition: all 0.5s ease-in-out;
//     -moz-transition: all 0.5s ease-in-out;
//     -ms-transition: all 0.5s ease-in-out;
//     -o-transition: all 0.5s ease-in-out;
//     transition: all 0.5s ease-in-out;
//     -webkit-border-radius: 5px 5px 5px 5px;
//     border-radius: 5px 5px 5px 5px;
// }

// input[type=text]:focus,
// input[type=password]:focus {
//     background-color: #fff;
//     border-bottom: 2px solid #5fbae9;
// }

// input[type=text]:placeholder {
//     color: #cccccc;
// }

// input[type=text].invalid-textbox,
// input[type=password].invalid-textbox {
//     border-bottom: 2px solid #ed5558;
// }

// label.validation-message {
//     color: #ed5558;
// }


// /* ANIMATIONS */


// /* Simple CSS3 Fade-in-down Animation */

// .fadeInDown {
//     -webkit-animation-name: fadeInDown;
//     animation-name: fadeInDown;
//     -webkit-animation-duration: 1s;
//     animation-duration: 1s;
//     -webkit-animation-fill-mode: both;
//     animation-fill-mode: both;
// }

// @-webkit-keyframes fadeInDown {
//     0% {
//         opacity: 0;
//         -webkit-transform: translate3d(0, -100%, 0);
//         transform: translate3d(0, -100%, 0);
//     }
//     100% {
//         opacity: 1;
//         -webkit-transform: none;
//         transform: none;
//     }
// }

// @keyframes fadeInDown {
//     0% {
//         opacity: 0;
//         -webkit-transform: translate3d(0, -100%, 0);
//         transform: translate3d(0, -100%, 0);
//     }
//     100% {
//         opacity: 1;
//         -webkit-transform: none;
//         transform: none;
//     }
// }


// /* Simple CSS3 Fade-in Animation */

// @-webkit-keyframes fadeIn {
//     from {
//         opacity: 0;
//     }
//     to {
//         opacity: 1;
//     }
// }

// @-moz-keyframes fadeIn {
//     from {
//         opacity: 0;
//     }
//     to {
//         opacity: 1;
//     }
// }

// @keyframes fadeIn {
//     from {
//         opacity: 0;
//     }
//     to {
//         opacity: 1;
//     }
// }

// .fadeIn {
//     opacity: 0;
//     -webkit-animation: fadeIn ease-in 1;
//     -moz-animation: fadeIn ease-in 1;
//     animation: fadeIn ease-in 1;
//     -webkit-animation-fill-mode: forwards;
//     -moz-animation-fill-mode: forwards;
//     animation-fill-mode: forwards;
//     -webkit-animation-duration: 1s;
//     -moz-animation-duration: 1s;
//     animation-duration: 1s;
// }

// .fadeIn.first {
//     -webkit-animation-delay: 0.4s;
//     -moz-animation-delay: 0.4s;
//     animation-delay: 0.4s;
// }

// .fadeIn.second {
//     -webkit-animation-delay: 0.6s;
//     -moz-animation-delay: 0.6s;
//     animation-delay: 0.6s;
// }

// .fadeIn.third {
//     -webkit-animation-delay: 0.8s;
//     -moz-animation-delay: 0.8s;
//     animation-delay: 0.8s;
// }

// .fadeIn.fourth {
//     -webkit-animation-delay: 1s;
//     -moz-animation-delay: 1s;
//     animation-delay: 1s;
// }


// /* Simple CSS3 Fade-in Animation */

// .underlineHover:after {
//     display: block;
//     left: 0;
//     bottom: -10px;
//     width: 0;
//     height: 2px;
//     background-color: #56baed;
//     content: "";
//     transition: width 0.2s;
// }

// .underlineHover:hover {
//     color: #0d0d0d;
// }

// .underlineHover:hover:after {
//     width: 100%;
// }


// /* OTHERS */

// *:focus {
//     outline: none;
// }

// #icon {
//     width: 50%;
// }

// * {
//     box-sizing: border-box;
// }

// .alert {
//     padding: 20px;
//     background-color: #f44336;
//     /* Red */
//     color: white;
//     margin-bottom: 15px;
// }

// .success {
//     padding: 20px;
//     background-color: #249424;
//     /* Green */
//     color: white;
//     margin-bottom: 15px;
// }


// /* Table Styles */

// .table-fill {
//     background: white;
//     border-radius: 3px;
//     border-collapse: collapse;
//     height: 320px;
//     margin: auto;
//     max-width: 600px;
//     padding: 5px;
//     width: 100%;
//     box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
//     animation: float 5s infinite;
// }

// th {
//     color: #D5DDE5;
//     ;
//     background: #1b1e24;
//     border-bottom: 4px solid #9ea7af;
//     border-right: 1px solid #343a45;
//     font-size: 23px;
//     font-weight: 100;
//     padding: 24px;
//     text-align: left;
//     text-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
//     vertical-align: middle;
// }

// th:first-child {
//     border-top-left-radius: 3px;
// }

// th:last-child {
//     border-top-right-radius: 3px;
//     border-right: none;
// }

// tr {
//     border-top: 1px solid #C1C3D1;
//     border-bottom-: 1px solid #C1C3D1;
//     color: #666B85;
//     font-size: 16px;
//     font-weight: normal;
//     text-shadow: 0 1px 1px rgba(256, 256, 256, 0.1);
// }

// tr:first-child {
//     border-top: none;
// }

// tr:last-child {
//     border-bottom: none;
// }

// tr:nth-child(odd) td {
//     background: #EBEBEB;
// }

// tr:last-child td:first-child {
//     border-bottom-left-radius: 3px;
// }

// tr:last-child td:last-child {
//     border-bottom-right-radius: 3px;
// }

// td {
//     background: #FFFFFF;
//     padding: 20px;
//     text-align: left;
//     vertical-align: middle;
//     font-weight: 300;
//     font-size: 18px;
//     text-shadow: -1px -1px 1px rgba(0, 0, 0, 0.1);
//     border-right: 1px solid #C1C3D1;
// }

// td:last-child {
//     border-right: 0px;
// }

// th.text-left {
//     text-align: left;
// }

// th.text-center {
//     text-align: center;
// }

// th.text-right {
//     text-align: right;
// }

// td.text-left {
//     text-align: left;
// }

// td.text-center {
//     text-align: center;
// }

// td.text-right {
//     text-align: right;
// }

// html,
// body {
//     height: 100%;
// }

// body {
//     margin: 0;
//     font-family: Roboto, "Helvetica Neue", sans-serif;
// }

