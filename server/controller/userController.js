// @desc : Regiter User
// @route: api/users
// @access: Public
const registerUser = (req, res) => {
	const { name, email, password } = req.body;

	if (!name || !email || !password) {
		res.status(400);
		throw new Error("All fields need to filled!");
	}

	res.send("Register User");
};

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
