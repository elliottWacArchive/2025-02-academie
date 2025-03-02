const express = require("express");
const FollowController = require("../controller/followController");
const router = express.Router();

router.post("/createFollow", FollowController.createFollow);
router.post("/deleteFollow", FollowController.deleteFollow);
router.post("/getFollowers", FollowController.getFollowers);
router.post("/getFollowing", FollowController.getFollowing);

module.exports = router;