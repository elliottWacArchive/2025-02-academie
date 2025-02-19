const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const crypto = require("crypto");
const SALT = "vive le projet tweet_academy";

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
                }
            });
        } catch (error) {
            console.error("Erreur lors de la création de l'utilisateur : ", error); 
            throw error;
        }
    }
}


module.exports = UserModel;
