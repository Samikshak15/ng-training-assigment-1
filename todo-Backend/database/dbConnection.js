const mongoose = require("mongoose");

const connectDB = async () => {
//  console.log(process.env.MONGO_URL);
 console.log("mongodb://localhost:27017/todo-list-Application");

  try {
   // await mongoose.connect(process.env.MONGO_URL);
    await mongoose.connect("mongodb://localhost:27017/todo-list-Application");
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed", error);
    process.exit(1);
  }
};

module.exports = connectDB;
