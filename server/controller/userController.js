const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error(" Invalid user data");
	}
});

// @desc : Login User
// @route: api/users/login
// @access: Public
const loginUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;

	//Find the email of user
	const user = await User.findOne({ email });

	//Check the user password
	if (user && (await bcrypt.compare(password, user.password))) {
		res.status(200).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			password: user.password,
			token: generateToken(user._id),
		});
	} else {
		res.status(401);
		throw new Error("Invalid credentials");
	}
});

// Creating Token
const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

module.exports = {
	registerUser,
	loginUser,
};
