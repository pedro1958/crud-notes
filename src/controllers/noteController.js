// Models
import Note from "../models/Note.js";

export const allNotes = async (req, res) => {
	try {
		const notes = await Note.find({ user: req.user._id })
			.sort({
				date: "desc",
			})
			.lean();
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
		res.render("notes/new-note", {
			errors,
			title,
			description,
		});
	}
	const newNote = new Note({ title, description });
	newNote.user = req.user._id;
	await newNote.save();
	req.flash("success_msg", "Nota agregada exitosamente");
	res.redirect("/notes");
};

export const formEditNote = async (req, res) => {
	const { id } = req.params;
	const note = await Note.findById(id).lean();
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
	const note = {
		title,
		description,
	};
	if (errors.length > 0) {
		res.render("notes/edit-note", {
			errors,
			note,
		});
	}
	await Note.findByIdAndUpdate(id, note, { new: true });
	req.flash("success_msg", "Nota editada exitosamente");
	res.redirect("/notes");
};

export const deleteNote = async (req, res) => {
	const { id } = req.params;
	await Note.findByIdAndDelete(id);
	req.flash("success_msg", "Nota eliminada exitosamente");
	res.redirect("/notes");
};
