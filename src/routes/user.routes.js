import express from "express";
const router = express.Router();

// Controllers
import {
	formSignin,
	signin,
	formSignup,
	signup,
	logout,
} from "../controllers/userController.js";

// Login
router.route("/signin").get(formSignin).post(signin);

// Register
router.route("/signup").get(formSignup).post(signup);

// Logout
router.route("/logout").get(logout);

export default router;
