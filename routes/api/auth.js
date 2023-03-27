const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/auth");
const { authenticate, upload } = require("../../middlewares");

router.post("/register", ctrl.register);
router.get("/verify/:verificationCode", ctrl.verifyEmail);
router.post("verify");
router.post("/login", ctrl.login);
router.get("/current", authenticate, ctrl.getCurrent);
router.post("/logout", authenticate, ctrl.logout);
router.patch("/avatars", authenticate, upload.single("avatar"), ctrl.updateAvatar);

module.exports = router;
