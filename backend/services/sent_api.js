const sentiment = require('sentiment');

const senti = new sentiment();

const preprocess = (str) => {
    str = " " + str + " "
    return str.replace(/ the | a | an | so /g, ' ');
}

const sent_analyzer = (text) => {
    return senti.analyze(preprocess(text));
}

const tweets_analyzer = async(tweets) => {
    for (let twt of tweets) {
        twt['score'] = sent_analyzer(twt.full_text);
    }
}

module.exports = {
    sent_analyzer,
    tweets_analyzer
};