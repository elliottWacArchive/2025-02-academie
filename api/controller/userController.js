const UserModel = require("../model/user");

const UserController = {
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
    async loadProfile(req, res) {
        try {
            const { id } = req.body;
            const user = await UserModel.loadProfile(id);
            if (!user) {
                return res.status(404).json({ error: "Utilisateur non trouvé." });
            } else {
                res.status(200).json({ user });
            }
        } catch (error) {
            res.status(500).json({ error: "Erreur serveur", details: error.message });
        }
    }
};

module.exports = UserController;
