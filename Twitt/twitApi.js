var Twit = require('twit')

var T = new Twit({
    consumer_key:         'LV60XU9yM2NuEvQ6JDtnOxtx6',
    consumer_secret:      'sA7Bbs3N5wO8BErROU0HdlP3Pu8TtghYgJ0za24yNcZuMEFUTc',
    access_token:         '1234400186786406400-ov3B9C0xFbKwF54K96xKjBPpeRz9oc',
    access_token_secret:  '4vnIPZKBZj3ULB3BMMD1CVgNCSz8QmtDJe95UqySwI44L',
    
});

let get_helper = (hashtag,id,count)=>{
    return new Promise((resolve,reject)=>{ 
        let params = {q: `${hashtag}`, count:count, lang:'en'};
        if(id != -1)
            params['max_id'] = `${id}`;
        T.get("search/tweets",params,(err, data)=>{
            if(err)return reject(err);
            resolve(data.statuses);
        });
    });
}

async function get_tweets(hashtag,max_tweets){
    let max_id = -1
    let tweets = []
    let total = 0
    
    while(total < max_tweets){ 
        var curr_tweets = []
        curr_tweets = await get_helper(hashtag,max_id,max_tweets-total);
        if(curr_tweets.length == 0) break;
        total += curr_tweets.length;
        console.log(curr_tweets.length,curr_tweets[0].created_at);
        tweets = tweets.concat(curr_tweets)
        max_id = curr_tweets[curr_tweets.length-1].id
    }
    return tweets;
}

get_tweets('#coronavirus',1).then(data=>{
    console.log(data)
});
