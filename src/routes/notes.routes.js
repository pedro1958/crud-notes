import e from "connect-flash";
import express from "express";
const router = express.Router();

// Controllers
import {
	allNotes,
	formNewNote,
	newNote,
	formEditNote,
	editNote,
	deleteNote,
} from "../controllers/noteController.js";

// Autorización
import { isAuthenticated } from "../helpers/auth.js";

// Todas las notas
router.get("/", isAuthenticated, allNotes);

// Nueva Nota
router
	.route("/add")
	.get(isAuthenticated, formNewNote)
	.post(isAuthenticated, newNote);

// Editar nota
router
	.route(`/edit/:id`)
	.get(isAuthenticated, formEditNote)
	.put(isAuthenticated, editNote);

// Eliminar nota
router.delete("/delete/:id", isAuthenticated, deleteNote);

export default router;
