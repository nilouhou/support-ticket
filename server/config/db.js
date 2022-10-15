const mongoose = require("mongoose");
const db_url = process.env.DB_URL;

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(db_url);
		console.log(`MOnGO DB connected: ${conn.connection.host}`.cyan.underline);
	} catch (error) {
		console.log(`Error: ${error.message}`.trimEnd.underline);
		process.exit(1);
	}
};

module.exports = connectDB;
