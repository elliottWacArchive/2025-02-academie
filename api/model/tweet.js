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
    static async getTweet(id) {
        try {
            return await prisma.tweets.findUnique({
                where: {
                    id: id
                }
            });
        }
        catch (error) {
            console.error("Erreur lors de la récupération du tweet : ", error);
            throw error;
        }
    }
    static async getTweets() {
        try {
            return await prisma.tweets.findMany({
                include: {
                    user: { 
                        select: { username: true } 
                    }
                },
                orderBy: {
                    created_at: 'desc' // Trie du plus récent au plus ancien
                }
            });
        }
        catch (error) {
            console.error("Erreur lors de la récupération des tweets : ", error);
            throw error;
        }
    }
}


module.exports = TweetModel;
