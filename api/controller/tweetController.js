
const tweetModel = require("../model/tweet");

const TweetController = {
    async createTweet(req, res) {
        try {
            const { tweet_text, token } = req.body;
            const newTweet = await tweetModel.createTweet(tweet_text, token);
            res.status(201).json({ message: "Tweet posté !", user: newTweet });
        } catch (error) {
            res.status(500).json({ error: "Erreur serveur", details: error.message });
            console.log(error);
        }
    },
    async findTweets(req, res) {
        try {
            const tweets = await tweetModel.getTweets();
            res.status(201).json({ message: "Tweets trouvés !", user: tweets });
        } catch (error) {
            res.status(500).json({ error: "Erreur serveur", details: error.message });
            console.log(error);
        }
    }
}

module.exports = TweetController;