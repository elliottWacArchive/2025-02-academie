const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const UserModel = require("./user");


class TweetModel {
    static async createTweet(tweet_text, token) {
        try {
            const user = await UserModel.getUser(token, "id");
            const retweet = 0;
            return await prisma.tweets.create({
                data: {
                    user_id: user,
                    head: 0,
                    body: tweet_text,
                    link: "",
                    retweet: retweet
                }
            });
        }
        catch (error) {
            console.error("Erreur lors de la création du tweet : ", error);
            throw error;
        }
}
}


module.exports = TweetModel;
