const Twit = require('twit')

const T = new Twit({
    consumer_key:         'LV60XU9yM2NuEvQ6JDtnOxtx6',
    consumer_secret:      'sA7Bbs3N5wO8BErROU0HdlP3Pu8TtghYgJ0za24yNcZuMEFUTc',
    access_token:         '1234400186786406400-ov3B9C0xFbKwF54K96xKjBPpeRz9oc',
    access_token_secret:  '4vnIPZKBZj3ULB3BMMD1CVgNCSz8QmtDJe95UqySwI44L',
    
});

const get_tweets_helper = (hashtag,id,count,since_id = -1)=>{
    return new Promise((resolve,reject)=>{ 
        let params = {q: `${hashtag}`, count:count, lang:'en'};
        if(id != -1)
            params['max_id'] = `${id}`;
        if(since_id != -1)params['since_id'] = `${since_id}`;
        T.get("search/tweets",params,(err, data)=>{
            if(err)return reject(err);
            resolve(data.statuses);
        });
    });
}

const get_tweets = async (hashtag,max_tweets,since_id = -1)=>{
    let max_id = -1
    let tweets = []
    let total = 0
    
    while(total < max_tweets){ 
        var curr_tweets = []
        curr_tweets = await get_tweets_helper(hashtag,max_id,max_tweets-total,since_id);
        if(curr_tweets.length == 0) break;
        total += curr_tweets.length;
        console.log(curr_tweets.length,curr_tweets[0].created_at);
        tweets = tweets.concat(curr_tweets)
        max_id = curr_tweets[curr_tweets.length-1].id
    }
    return tweets;
}

// get_tweets('#coronavirus',112).then(data=>{
//     console.log(data.length)
// });
const get_user_tweets_helper = (user,count=200,max_id = -1,since_id = -1)=>{
    return new Promise((resolve,reject)=>{
        let params = {screen_name : user,count : count};
        if(since_id != -1)params['since_id'] = `${since_id}`;
        if(max_id != -1)params['max_id'] = `${max_id}`;
        T.get('statuses/user_timeline',params,(err,data)=>{
            if(err)return reject(err);
            resolve(data);
        });
    });
    
}


const get_user_tweets = async (user,max_tweets,since_id=-1)=>{
    let tweets = []
    let total = 0
    let max_id = -1
    
    while(total < max_tweets){ 
        var curr_tweets = []
        curr_tweets = await get_user_tweets_helper(user,count = max_tweets-total,max_id = max_id,since_id);
        if(curr_tweets.length == 0) break;
        total += curr_tweets.length;
        console.log(curr_tweets.length,curr_tweets[0].created_at,curr_tweets[curr_tweets.length-1].created_at);
        tweets = tweets.concat(curr_tweets)
        max_id = curr_tweets[curr_tweets.length-1].id
    }
    return tweets;
}

module.exports = {
    get_tweets : get_tweets,
    get_user_tweets : get_user_tweets
};
