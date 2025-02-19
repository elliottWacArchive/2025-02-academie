const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const crypto = require("crypto");
const SALT = "vive le projet tweet_academy";

class UserModel {
    static async createUser(username, email, password, birthdate) {
        // hash du mdp avec HMAC-RIPEMD-160
        const hashedPassword = crypto.createHmac("ripemd160", SALT).update(password).digest("hex");
        const token = crypto.randomBytes(32).toString('hex');
        return prisma.users.create({
            data: {
                username,
                email,
                password: hashedPassword,
                birthdate,
                pp: 'default.jpg',
                bio: '',
                token: token,
                role: 1
            }
        });
    }
}

module.exports = UserModel;
