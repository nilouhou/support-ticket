const express = require("express");
const dotenv = require("dotenv").config();
const router = require("./routes/userRoutes");
const { errorHandler } = require("./middleWares/errorMiddleware");

const PORT = process.env.PORT;

const app = express();

//middleware for reading request
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/users", router);

//Error Middleware
app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`Ther server is running on ${PORT}`);
});
