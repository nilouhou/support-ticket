import axios from "axios";

const USER_URL = "/api/users";

const registerData = async (userData) => {
	const response = await axios.post(USER_URL, userData);
	if (response) {
		localStorage.setItem("user", JSON.stringify(response.data));
	}
	return response.data;
};

const autoServer = { registerData };

export default autoServer;
