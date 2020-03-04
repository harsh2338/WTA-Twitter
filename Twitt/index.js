// var Twit = require("twit");
// // var config = require("./config");
// var T = new Twit({
//   consumer_key:         '...',
//   consumer_secret:      '...',
//   access_token:         '...',
//   access_token_secret:  '...',
//   timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
//   strictSSL:            true,     // optional - requires SSL certificates to be valid.
// })


// var params = {
//   q: "photography",
//   count: 2
// };

// T.get("search/tweets", params, Follow_function); // follow function to be called once the tweets are loaded

// function Follow_function(err, data, response) {
//   var tweets = data.statuses;
//   console.log(data);
//   // for (var i = 0; i < tweets.length; i++) {
//   //   console.log(tweets[i].text);
//   // }
// }

var Twit = require('twit')

var T = new Twit({
  consumer_key:         'LV60XU9yM2NuEvQ6JDtnOxtx6',
  consumer_secret:      'sA7Bbs3N5wO8BErROU0HdlP3Pu8TtghYgJ0za24yNcZuMEFUTc',
  access_token:         '1234400186786406400-ov3B9C0xFbKwF54K96xKjBPpeRz9oc',
  access_token_secret:  '4vnIPZKBZj3ULB3BMMD1CVgNCSz8QmtDJe95UqySwI44L',
  
})

var params = {
  q: "photography",
  count: 2
};

T.get("search/tweets", params, Follow_function); // follow function to be called once the tweets are loaded

function Follow_function(err, data, response) {
  var tweets = data.statuses;
  // console.log(data);
  for (var i = 0; i < tweets.length; i++) {
    console.log(tweets[i].text);
    console.log("Next tweet")
  }
}