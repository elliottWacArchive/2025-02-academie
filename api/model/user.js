const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const crypto = require("crypto");
require('dotenv').config();
const SALT = process.env.SALT;

class UserModel {
    static async createUser(username, email, password, birthdate) {
        try {
            const hashedPassword = crypto.createHmac("ripemd160", SALT).update(password).digest("hex");
            const token = crypto.randomBytes(32).toString('hex');

            const birthDateObj = new Date(birthdate);

            console.log("Création de l'utilisateur avec : ", {
                username, email, password: hashedPassword, birthdate, token
            });

            return await prisma.users.create({
                data: {
                    username,
                    email,
                    password: hashedPassword,
                    birthdate: birthDateObj,
                    pp: 'default.jpg',
                    bio: '',
                    token: token,
                    role: 1,
                    modified_at: new Date(),
                    created_at: new Date(),
                }
            });
        } catch (error) {
            console.error("Erreur lors de la création de l'utilisateur : ", error); 
            throw error;
        }
    }

    static async verifyPassword(username, password) {
        try {
            const user = await prisma.users.findFirst({
                where: { username: username }
            });

            if (!user) {
                throw new Error("User not found");
            }

            const hashedPassword = crypto.createHmac("ripemd160", SALT).update(password).digest("hex");

            if (user.password === hashedPassword) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error("Erreur lors de la vérification du mot de passe : ", error);
            throw error;
        }
    }

    static async getToken(username) {
        const user = await prisma.users.findFirst({
            where: { username: username }
        });
        return user.token;
    }

    static async isToken(token) {
        const user = await prisma.users.findFirst({
            where: { token: token }
        });

        if (!user) {
            return false;
        }

        return true;
    }

    static async editUser(token, param, value) {
        try {
            const user = await prisma.users.findFirst({
                where: { token: token }
            });

            if (!user) {
                throw new Error("User not found");
            }

            if (param === 'password') {
                value = crypto.createHmac("ripemd160", SALT).update(value).digest("hex");
            }

            const updatedUser = await prisma.users.update({
                where: { id: user.id },
                data: { 
                    [param]: value,
                    modified_at: new Date()
                }
            });

            return updatedUser;
        } catch (error) {
            console.error("Erreur lors de la modification de l'utilisateur : ", error);
            throw error;
        }
    }

    static async getUser(token, param) {
        try {
            const user = await prisma.users.findFirst({
                where: { token: token }
            });

            if (!user) {
                throw new Error("Utilisateur non trouvé");
            }

            if (!user[param]) {
                throw new Error("Paramètre non trouvé");
            }

            return user[param];
        } catch (error) {
            console.error("Erreur lors de la récupération de l'utilisateur : ", error);
            throw error;
        }
    }

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

    static async getUserByNames(usernam) {
        try {
            return await prisma.users.findMany({
                where: {
                    username: {
                        contains: usernam,
                    }
                }
            });
        } catch (error) {
            console.error("Erreur lors de la récupération de l'utilisateur : ", error);
            throw error;
        }
    }

    static async getFollowers(id) {
        try {
            const follows = await prisma.follows.findFirst({
                where: { id: id }
            });

            if (!follows) {
                throw new Error("Utilisateur non trouvé");
            }
            return follows;
        } catch (error) {
            console.error("Erreur lors de la récupération des followers : ", error);
            throw error;
        }
    }
}

module.exports = UserModel;
