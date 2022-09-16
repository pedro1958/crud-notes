// Models
import Note from "../models/Note.js";

// Services
import {
	getNotes,
	oneNote,
	createNote,
	updateNote,
	removeNote,
} from "../services/noteService.js";

export const allNotes = async (req, res) => {
	try {
		const notes = await getNotes(req.user._id, "desc");
		res.render("notes/all-notes", { notes, name: req.user.name });
	} catch (error) {
		console.error(error);
	}
};

export const formNewNote = (req, res) => {
	res.render("notes/new-note");
};

export const newNote = async (req, res) => {
	const { title, description } = req.body;
	const errors = [];
	if (!title) {
		errors.push({ text: "Indique el título de la nota" });
	}
	if (!description) {
		errors.push({ text: "Indique la descripción de la nota" });
	}
	if (errors.length > 0) {
		return res.render("notes/new-note", {
			errors,
			title,
			description,
		});
	}
	const newNote = await createNote({ title, description }, req.user._id);
	if (!newNote) {
		req.flash(
			"error",
			"Error al crear la nota en la base de datos, intentalo de nuevo"
		);
		res.redirect("/notes");
	}
	req.flash("success_msg", "Nota agregada exitosamente");
	res.redirect("/notes");
};

export const formEditNote = async (req, res) => {
	const { id } = req.params;
	const note = await oneNote(id);
	if (!note) {
		req.flash("error", "No existe nota en la base de datos");
		res.redirect("/notes");
	}
	res.render("notes/edit-note", { note });
};

export const editNote = async (req, res) => {
	const { id } = req.params;
	const { title, description } = req.body;
	const errors = [];
	if (!title) {
		errors.push({ text: "Indique el título de la nota" });
	}
	if (!description) {
		errors.push({ text: "Indique la descripción de la nota" });
	}
	if (errors.length > 0) {
		return res.render("notes/edit-note", {
			errors,
			title,
			description,
		});
	}
	const note = await oneNote(id);
	if (!note) {
		req.flash("error", "No existe nota en la base de datos");
		res.redirect("/notes");
	}
	const noteUpdate = {
		title,
		description,
	};
	await updateNote(id, noteUpdate);
	req.flash("success_msg", "Nota editada exitosamente");
	res.redirect("/notes");
};

export const deleteNote = async (req, res) => {
	const { id } = req.params;

	const note = await oneNote(id);
	if (!note) {
		req.flash("error", "No existe nota en la base de datos");
		res.redirect("/notes");
	}

	await removeNote(id);
	req.flash("success_msg", "Nota eliminada exitosamente");
	res.redirect("/notes");
};
