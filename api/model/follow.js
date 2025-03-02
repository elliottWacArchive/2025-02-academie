const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

class FollowModel {
    static async createFollow(followerId, followingId) {
        if (followerId === followingId) {
            throw new Error("Tu ne peux pas te suivre toi-même !");
        }
        return await prisma.follows.create({
            data: {
                followerId: followerId,
                followingId: followingId,
            },
        });
    }

    static async deleteFollow(followerId, followingId) {
        return await prisma.follows.deleteMany({
            where: {
                followerId: followerId,
                followingId: followingId,
            },
        });
    }
// 🔹 Voir qui un utilisateur suit :
    static async getFollowers(userId) {
        return await prisma.follows.findMany({
            where: {
                followingId: userId,
            },
            include: {
                following: { select: { id: true, username: true } }
            }
        });
    }
    static async getFollowers(userId) {
        return await prisma.follows.findMany({
            where: { followingId: userId },
            include: { follower: { select: { id: true, username: true } } }
        });
    }
    
}

module.exports = FollowModel;