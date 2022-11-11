const express = require("express");
const colors = require("colors");
const path = require("path");
const dotenv = require("dotenv").config();
const cors = require("cors");
const router = require("./routes/userRoutes");
const ticketRouter = require("./routes/ticketRoutes");

const { errorHandler } = require("./middleWares/errorMiddleware");
const connectDB = require("./config/db");

const PORT = process.env.PORT;

//Connection to Database
connectDB();

const app = express();
app.use(cors());

//middleware for reading request
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/users", router);
app.use("/api/tickets", ticketRouter);

//Serve FrontEnd
if (process.env.Node_ENV === "production") {
	// Set build folder as static
	app.use(express.static(path.join(__dirname, "../frontend/build")));

	//any routes except the ones that we created should go this way
	app.get("*", (req, res) =>
		res.sendFile(__dirname, "../", "frontend", "build", "index.html")
	);
} else {
	app.get("/", (req, res) => {
		res.status(200).json({ message: "Welcome to the Support Desk API" });
	});
}

//Error Middleware
app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`Ther server is running on ${PORT}`);
});
