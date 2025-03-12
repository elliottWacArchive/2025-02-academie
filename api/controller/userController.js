const UserModel = require("../model/user");
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const UserController = {
    uploadMiddleware: upload.single("pp"),

    async register(req, res) {
        try {
            const { username, email, password, birthdate } = req.body;
            if (!username || !email || !password || !birthdate) {
                return res.status(400).json({ error: "Tous les champs sont requis." });
            }

            const newUser = await UserModel.createUser(username, email, password, birthdate);
            res.status(201).json({ message: "Utilisateur créé avec succès !", user: newUser });
        } catch (error) {
            res.status(500).json({ error: "Erreur serveur", details: error.message });
        }
    },

    async getUser(req, res) {
        try {
            const { token, param } = req.body;
            const newUser = await UserModel.getUser(token, param);
            res.status(201).json({ message: "Utilisateur trouvé avec succès !", user: newUser });
        } catch (error) {
            res.status(500).json({ error: "Erreur serveur", details: error.message });
        }
    },

    async editUser(req, res) {
        try {
            const { token, param, value } = req.body;
            if (!token || !param || !value) {
                return res.status(400).json({ error: "Tous les champs sont requis." });
            }
            const editedUser = await UserModel.editUser(token, param, value);
            res.status(201).json({ message: "Utilisateur modifié avec succès !", user: editedUser });
        } catch (error) {
            res.status(500).json({ error: "Erreur serveur", details: error.message });
        }
    },

    async login(req, res) {
        try {
            const { username, password } = req.body;
            if (!username || !password) {
                return res.status(400).json({ error: "Tous les champs sont requis.", token: false });
            }
            const verifyPassword = await UserModel.verifyPassword(username, password);
            if (verifyPassword == false) {
                res.status(401).json({ message: "Mot de passe ou nom d'Utilisateur incorrect.", token: false });
            } else {
                const token = await UserModel.getToken(username);
                res.status(202).json({ message: "Utilisateur connecté avec succès !", token: token });
            }
        } catch (error) {
            res.status(500).json({ error: "Erreur serveur", details: error.message, token: false });
        }
    },

    async isToken(req, res) {
        try {
            const { token } = req.body;
            const isToken = await UserModel.isToken(token);
            if (isToken == false) {
                res.status(401).json({ error: "Token invalide.", token: false });
            } else {
                res.status(202).json({ message: "Token valide.", token: true });
            }
        } catch (error) {
            console.error("Erreur lors de la vérification du token : ", error);
            throw error;
        }
    },

    async loadProfiles(req, res) {
        try {
            console.log(req.body); 
            const {name} = req.body;
            console.log(name);
            const users = await UserModel.getUserByName(name);
            if (!users || users.length === 0) {
                return res.status(404).json({ error: "Utilisateur non trouvé." });
            } else {
                res.status(200).json({ message: `Profils Trouvés ! avec ${name}`, user : users });
            }
        } catch (error) {
            res.status(500).json({ error: "Erreur serveur", details: error.message });
        }
    },

    async getProfile(req, res) {
        try {
            const { token } = req.body;
            const user = await UserModel.getUser(token, "id");
            if (!user) {
                return res.status(404).json({ error: "Utilisateur non trouvé." });
            } else {
                res.status(200).json({ user });
            }
        } catch (error) {
            res.status(500).json({ error: "Erreur serveur", details: error.message });
        }
    },

    async setPp(req, res) {
        try {
            const { token } = req.body;
            if (!token) {
                return res.status(400).json({ error: "Token requis." });
            }

            const user = await UserModel.getUser(token, "id");
            if (!user) {
                return res.status(404).json({ error: "Utilisateur non trouvé." });
            }

            if (!req.file) {
                return res.status(400).json({ error: "Aucune image envoyée." });
            }

            const uploadDir = path.join(__dirname, "../storage/pp");
            const fileName = `${user}.png`;
            const filePath = path.join(uploadDir, fileName);

            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }

            await sharp(req.file.buffer)
                .resize(255, 255)
                .png()
                .toFile(filePath);

            if (fs.existsSync(filePath)) {
                await UserModel.editUser(token, 'pp', `${fileName}`);
                res.status(200).json({ message: "Photo de profil mise à jour !", path: `/storage/pp/${fileName}` });
            }
        } catch (error) {
            res.status(500).json({ error: "Erreur serveur", details: error.message });
        }
    }
};

module.exports = UserController;
