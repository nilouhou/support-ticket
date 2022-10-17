const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

const User = require("../models/userModel");

// @desc : Regiter User
// @route: api/users
// @access: Public
const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;

	//Validate data
	if (!name || !email || !password) {
		res.status(400);
		throw new Error("All fields need to filled!");
	}

	//Find if user already Exist
	const userExist = await User.findOne({ email });

	if (userExist) {
		res.status(400);
		throw new Error("User Already Exist");
	}

	//Hashed password with Bcrypt
	const salt = await bcrypt.genSalt(10);
	const hashedPass = await bcrypt.hash(password, salt);

	//Create User
	const user = await User.create({
		name,
		email,
		password: hashedPass,
	});

	//_id: it is the way mongodb stores id
	if (user) {
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			password: user.password,
		});
	} else {
		res.status(400);
		throw new Error(" Invalid user data");
	}
});

// @desc : Login User
// @route: api/users/login
// @access: Public
const loginUser = (req, res) => {
	res.send("Login User");
};

module.exports = {
	registerUser,
	loginUser,
};
