const express = require("express");
const UserController = require("../controller/userController");

const router = express.Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/isToken", UserController.isToken);

module.exports = router;