import axios from "axios";

const USER_URL = "/api/users";

//Register a user

const registerData = async (userData) => {
	const response = await axios.post(USER_URL, userData);
	if (response) {
		localStorage.setItem("user", JSON.stringify(response.data));
	}
	return response.data;
};

// Logout a user
const logout = () => {
	localStorage.removeItem("user");
};

const autoServer = { registerData, logout };

export default autoServer;
