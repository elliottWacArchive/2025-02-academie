const { PrismaClient } = require('@prisma/client');
// const { login } = require('../controller/userController');

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

    // Essai
    static async loadProfile(id) {
        try {
            const user = await prisma.users.findFirst({
                where: { id: id }
            });

            if (!user) {
                return {user: false};
            }
            console.log("Profil chargé : ", user);
            return user;
        } catch (error) {
            console.error("Erreur lors du chargement du profil : ", error);
            throw error;
        }
    }
// 🔹 Voir qui un utilisateur suit :
    static async getFollowers(id) {
        try {
            console.log("userId", id);
            console.log("No way");
            
            const rsl = await prisma.follows.findMany({
                where: { followerId: id},
                select: {
                    followerId: true,
                    followingId: true,
                    // follower: { select: { id: true, username: true } },
                    following: { select: { id: true, username: true } }
                }
            });
            if (!rsl) {
                throw new Error("Utilisateur non trouvé");
            }
            console.log("A trouvés : ", rsl);
            return rsl;
        } catch (error) {
            console.error("Erreur lors de la récupération des followers : ", error);
            throw error;
        }
    }
    // static async getFollowers(userId) {
    //     return await prisma.follows.findMany({
    //         where: { followingId: userId },
    //         include: { follower: { select: { id: true, username: true } } }
    //     });
    // }
    
}

module.exports = FollowModel;