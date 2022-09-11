import mongoose from "mongoose";
const { connect } = mongoose;

export const conn = async () => {
	try {
		const db = await connect("mongodb://localhost/notesApp");
		console.log(`Base de datos: ${db.connection.name}, esta conectada`);
	} catch (error) {
		console.log(error);
	}
};
