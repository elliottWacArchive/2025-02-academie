const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const UserModel = require("user");


class TweetModel {
    static async createTweet(token, head, tweet_text, link, retweet = 0) {
        try {
            const user = UserModel.getUser(token, id);
            const log = await prisma.users.findUnique({
                where: { id: user }
            });

            if (!log) {
                throw new Error("User not found");
            }

            return await prisma.tweets.create({
                data: {
                    user_id: user,
                    head: head,
                    text: tweet_text,
                    link: link,
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
