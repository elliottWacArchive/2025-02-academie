const FollowModel = require("../model/follow");

const FollowController = {
    async createFollow(req, res) {
        try {
            const { followerId, followingId } = req.body;
            const newFollow = await FollowModel.createFollow(followerId, followingId);
            res.status(201).json({ message: "Follow créé !", follow: newFollow });
        } catch (error) {
            res.status(500).json({ error: "Erreur serveur", details: error.message });
            // console.log(error);
        }
    },
    async deleteFollow(req, res) {
        try {
            const { followerId, followingId } = req.body;
            const deletedFollow = await FollowModel.deleteFollow(followerId, followingId);
            res.status(201).json({ message: "Follow supprimé !", follow: deletedFollow });
        } catch (error) {
            res.status(500).json({ error: "Erreur serveur", details: error.message });
            console.log(error);
        }
    },
    async getFollowers(req, res) {
        try {
            const { userId } = req.body;
            const followers = await FollowModel.getFollowers(userId);
            res.status(201).json({ message: "Followers trouvés !", followers: followers });
        } catch (error) {
            res.status(500).json({ error: "Erreur serveur", details: error.message });
            console.log(error);
        }
    },
    async getFollowing(req, res) {
        try {
            const { userId } = req.body;
            const following = await FollowModel.getFollowing(userId);
            res.status(201).json({ message: "Following trouvés !", following: following });
        } catch (error) {
            res.status(500).json({ error: "Erreur serveur", details: error.message });
            console.log(error);
        }
    }
}
module.exports = FollowController;

