const express = require("express");
const app = express();
const socketsio = require('socket.io');

require('./config/database_config');

const bodyParser = require("body-parser");
const cors = require("cors");

const tweets = require("./routes/tweets");
const auth = require('./routes/auth');

const PORT = 3000
const server = app.listen(PORT,()=>console.log("listening at", PORT));
const io = socketsio(server);
require('./services/stream')(io);

app.use(bodyParser.json());
app.use(cors());

app.use("/tweets",tweets);
app.use("/auth",auth);
app.get("/stream",(req,res)=>{res.sendFile(__dirname + '/public/client.html')});



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