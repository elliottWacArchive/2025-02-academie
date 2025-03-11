
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
    },
    async getHashtag(req, res) {
        try {
            const { hashtag } = req.body;
            const tags = await tweetModel.getHashtag(hashtag);
            res.status(201).json({ message: "Hashtag trouvés !", user: tags });
        } catch (error) {
            res.status(500).json({ error: "Erreur serveur", details: error.message });
            console.log(error);
        }
    },

    async getAt(req, res) {
        try {
            const { at } = req.body;
            const tags = await tweetModel.getAt(at);
            res.status(201).json({ message: "At trouvé !", user: tags });
        } catch (error) {
            res.status(500).json({ error: "Erreur serveur", details: error.message });
            console.log(error);
        }
    }
}

module.exports = TweetController;