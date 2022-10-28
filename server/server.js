const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const cors = require("cors");
const router = require("./routes/userRoutes");

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
app.use("/api/tickets", require("./routes/ticketRoutes"));

//Error Middleware
app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`Ther server is running on ${PORT}`);
});
