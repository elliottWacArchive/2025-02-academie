const express = require("express");
const TweetController = require("../controller/tweetController");

const router = express.Router();

router.post("/createTweet", TweetController.createTweet);
router.get("/findTweets", TweetController.findTweets);
router.post("/getHashtag", TweetController.getHashtag);
router.post("/getAt", TweetController.getAt);

module.exports = router;