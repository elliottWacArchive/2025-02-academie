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
            console.log(error);
        }
    }
};

module.exports = UserController;
