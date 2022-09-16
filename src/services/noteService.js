// Models
import Note from "../models/Note.js";

/**
 * En sete modulo se va interactuar con MongoDB
 */

// Mostrar todas las notas
export const getNotes = async (id, order) => {
	const notes = await Note.find({ user: id })
		.sort({
			date: order,
		})
		.lean();

	return notes;
};

// Mostrar una nota por id
export const oneNote = async (id) => {
	return await Note.findById(id).lean();
};

// Crear nueva nota
export const createNote = async (data, id) => {
	const newNote = new Note(data);
	newNote.user = id;
	return await newNote.save();
};

export const updateNote = async (id, data) => {
	return await Note.findByIdAndUpdate(id, data, { new: true });
};

export const removeNote = async (id) => {
	return Note.findByIdAndDelete(id);
};
