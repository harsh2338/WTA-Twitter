const T = require('../config/twit_config').Twit;

const tweet_metadata = ['created_at','id','full_text','geo','coordinates','place','retweet_count','favorite_count']
const user_metadata = ['id','name','screen_name','location','profile_background_color','profile_background_image_url','profile_image_url']

const process_tweets = (tweets)=>{
    let processed_tweets = [];
    for(let tweet of tweets){
        let twt = {}
        for(let tm of tweet_metadata)
            twt[tm] = tweet[tm];
        if('retweeted_status' in tweet)
            twt['full_text'] = tweet.retweeted_status.full_text;
        if('extended_tweet' in tweet)
            twt['full_text'] = tweet.extended_tweet.full_text;
        if(!twt['full_text']) twt['full_text'] = tweet.text;
        twt['user'] = {};
        for(let um of user_metadata)
            twt['user'][um] = tweet['user'][um];
        processed_tweets.push(twt);
    }
    return processed_tweets;
}

const get_tweets_helper = (hashtag,id,count,since_id = -1)=>{
    return new Promise((resolve,reject)=>{ 
        let params = {q: `${hashtag}`, count:count, lang:'en',tweet_mode : 'extended'};
        if(id != -1)
            params['max_id'] = `${id}`;
        if(since_id != -1)params['since_id'] = `${since_id}`;
        T.get("search/tweets",params,(err, data)=>{
            if(err)return reject(err);
            resolve(process_tweets(data.statuses));
        });
    });
}

const get_tweets = async (hashtag,max_tweets = 100,since_id = -1)=>{
    let max_id = -1
    let tweets = []
    let total = 0
    
    while(total < max_tweets){ 
        var curr_tweets = []
        curr_tweets = await get_tweets_helper(hashtag,max_id,max_tweets-total,since_id);
        if(curr_tweets.length == 0) break;
        total += curr_tweets.length;
        tweets = tweets.concat(curr_tweets)
        max_id = curr_tweets[curr_tweets.length-1].id
    }
    return tweets;
}

const get_user_tweets_helper = (user,count=200,max_id = -1,since_id = -1)=>{
    return new Promise((resolve,reject)=>{
        let params = {screen_name : user,count : count,tweet_mode : 'extended'};
        if(since_id != -1)params['since_id'] = `${since_id}`;
        if(max_id != -1)params['max_id'] = `${max_id}`;
        T.get('statuses/user_timeline',params,(err,data)=>{
            if(err)return reject(err);
            resolve(process_tweets(data));
        });
    });
    
}

const get_user_tweets = async (user,max_tweets = 100,since_id=-1)=>{
    let tweets = []
    let total = 0
    let max_id = -1
    
    while(total < max_tweets){ 
        var curr_tweets = []
        curr_tweets = await get_user_tweets_helper(user,count = max_tweets-total,max_id = max_id,since_id);
        if(curr_tweets.length == 0) break;
        total += curr_tweets.length;
        tweets = tweets.concat(curr_tweets)
        max_id = curr_tweets[curr_tweets.length-1].id
    }
    return tweets;
}

module.exports = {
    process_tweets,
    get_tweets,
    get_user_tweets,
};



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