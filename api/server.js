const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
    res.send("Bienvenue sur l'API AbiliBird!");
});

app.get("/users", async (req, res) => {
    const users = await prisma.users.findMany();
    res.json(users);
});

app.post("/users", async (req, res) => {
    const { username, email, password } = req.body;
    const user = await prisma.user.create({
        data: { username, email, password }
    });
    res.json(user);
});

// Démarrer le serveur
app.listen(3000, () => {
    console.log("API Express en marche sur http://localhost:3000");
});
