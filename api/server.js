const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const userRoutes = require("./routes/userRoutes.js");
const tweetRoutes = require("./routes/tweetRoutes.js");
const multer = require("multer");
const prisma = new PrismaClient();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/storage", express.static("storage"));

app.use(async (err, req, res, next) => {
    console.error(err); // Log de l'erreur dans la console
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        return res.status(400).json({ error: "Erreur Prisma", details: err.message });
    }
    return res.status(500).json({ error: "Erreur serveur interne", details: err.message });
});

// Routes
app.use("/users", userRoutes);
app.use("/tweets", tweetRoutes);
app.use('/storage', express.static('storage'));

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
