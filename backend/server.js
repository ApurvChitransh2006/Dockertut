require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const todoRoutes = require("./routes/todo.route");
const connectDB = require("./config/db");

const app = express();
connectDB();

app.use(express.json());

app.use(cors({
    origin: process.env.CLIENT_URL
}));
app.use(morgan("dev"));

app.use("/api/todos",todoRoutes);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 