const express = require("express");
const TweetController = require("../controller/tweetController");

const router = express.Router();

router.post("/createTweet", TweetController.createTweet);

module.exports = router;