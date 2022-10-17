const mongoose = require("mongoose");

//Schema take an object of fields
const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Please add your Name"],
		},
		email: {
			type: String,
			required: [true, "Please add your Email"],
			uniqe: true,
		},
		password: {
			type: String,
			required: [true, "Please add your Password"],
		},
		isAdmin: {
			type: Boolean,
			required: true,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("User", userSchema);
