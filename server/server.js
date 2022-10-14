const express = require("express");
const dotenv = require("dotenv").config();
const router = require("./routes/userRoutes");

const PORT = process.env.PORT;

const app = express();

app.use("/api/user", router);

app.listen(PORT, () => {
	console.log(`Ther server is running on ${PORT}`);
});
