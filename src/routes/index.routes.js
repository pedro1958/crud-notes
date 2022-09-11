import express from "express";
const router = express.Router();

// Controllers
import { index, about } from "../controllers/indexController.js";

router.get("/", index);

router.get("/about", about);

export default router;
