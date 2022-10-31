export const errorHandling = (error) => {
	return error.response?.data?.message || error.message || error.toString();
};
