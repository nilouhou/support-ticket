const errorHandler = (error, req, res, next) => {
	const stustCode = res.stustCode ? res.stustCode : 500;
	res.status(stustCode);
	res.json({
		message: error.message,
		stack: process.env.Node_ENV === "production" ? null : error.stack,
	});
};

module.exports = { errorHandler };
