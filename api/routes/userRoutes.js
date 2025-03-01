const express = require("express");
const UserController = require("../controller/userController");
const router = express.Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/edit", UserController.editUser);
router.post("/setPp", UserController.uploadMiddleware, UserController.setPp);
router.post("/isToken", UserController.isToken);
router.post("/getUser", UserController.getUser);
router.post("/loadProfile", UserController.loadProfile);

module.exports = router;