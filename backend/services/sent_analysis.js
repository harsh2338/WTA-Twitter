const twitApi = require('./twit_api');
const sentiment = require('sentiment');

const senti = new sentiment();

const preprocess = (str)=>{
    str = " "+str+" "
    return str.replace(/ the | a | an | so /g,' ');
}

const tweet_metadata = ['created_at','id','full_text','geo','coordinates','place','retweet_count','favorite_count']
const user_metadata = ['id','name','screen_name','location','profile_background_color','profile_background_image_url','profile_image_url']

const sa = async (tag,max_tweets = 500)=>{
    let data = [];
    if(tag[0] == '#')
        data = await twitApi.get_tweets(tag,max_tweets);
    else if(tag[0] == '@')
        data = await twitApi.get_user_tweets(tag,max_tweets);

    let tweet_data = [];
    for(let tweet of data){
        let twt = {}
        for(let tm of tweet_metadata)
            twt[tm] = tweet[tm];
        if('retweeted_status' in tweet)
            twt['full_text'] = tweet.retweeted_status.full_text
        twt['user'] = {};
        for(let um of user_metadata)
            twt['user'][um] = tweet['user'][um];
        twt['score'] = senti.analyze(preprocess(twt.full_text));
        tweet_data.push(twt);
    }
    return tweet_data;
}

module.exports = {
    sa : sa
};

// twitApi.get_user_tweets('narendramodi',111).then(data=>console.log(data.length))

// sa('#coronavirus',2050).then(data=>{
//     let sum = 0
//     console.log(data.length)
//     for(d of data)
//         sum += d.score.comparative;
//     console.log(sum/data.length);
// })



