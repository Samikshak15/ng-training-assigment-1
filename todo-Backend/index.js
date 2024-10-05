require("dotenv").config();
const express = require("express");
const taskRoutes = require("./routes/taskRoutes");
const connectDB = require("./database/dbConnection");
const cors = require("cors");
const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());

connectDB();

app.get("/get", (req,res) => {
  console.log("Hello world");
})

app.use(express.json());
app.use("/api/tasks", taskRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

