// const sentiment = require('sentiment');

// const senti = new sentiment();

// const preprocess = (str)=>{
//     str = " "+str+" "
//     return str.replace(/ the | a | an | so /g,' ');
// }

// const sent_analyzer = (text) => {
//     return senti.analyze(preprocess(text));
// }

// const tweets_analyzer = async (tweets)=>{
//     for(let twt of tweets){
//         twt['score'] = sent_analyzer(twt.full_text);
//     }
// }

// module.exports = {
//     sent_analyzer,
//     tweets_analyzer
// };

const Twitter = require('twitter');
const {twitter_keys} = require('../config/twit_config');
const sent_api = require('../services/sent_api');
const twit_api = require('../services/twit_api');

let streams = {};

module.exports = (io) => {
    io.on('connection', function (client) {
        console.log('connected')

        client.on('setStream',(data) => {
            if(streams[client.conn.id])streams[client.conn.id].destroy();

            const T = new Twitter(twitter_keys);
            let stream = T.stream('statuses/filter', { track: data, language : 'en',tweet_mode : 'extended'});

            streams[client.conn.id] = stream;
            console.log('streaming :', data);
            
            stream.on('data', async (tweet)=>{
                const data = twit_api.process_tweets([tweet]);
                await sent_api.tweets_analyzer(data);
                client.emit('tweets', {tweet : data[0]})
            });

            stream.on('error',(err)=>{});
        });

        client.on('disconnect', ()=>{
            if(streams[client.conn.id])streams[client.conn.id].destroy();
            console.log('disconnected')
        });
    });
}


// const sentiment = require('sentiment');

// const senti = new sentiment();

// const preprocess = (str)=>{
//     str = " "+str+" "
//     return str.replace(/ the | a | an | so /g,' ');
// }

// const sent_analyzer = (text) => {
//     return senti.analyze(preprocess(text));
// }

// const tweets_analyzer = async (tweets)=>{
//     for(let twt of tweets){
//         twt['score'] = sent_analyzer(twt.full_text);
//     }
// }

// module.exports = {
//     sent_analyzer,
//     tweets_analyzer
// };