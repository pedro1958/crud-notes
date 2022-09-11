import mongoose from "mongoose";
const { Schema, model } = mongoose;

const noteSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		date: {
			type: Date,
			default: Date.now,
		},
		user: {
			type: mongoose.Types.ObjectId,
			model: "User",
		},
	},
	{ versionKey: false }
);

const Note = model("Note", noteSchema);

export default Note;
