import mongoose from "mongoose";


export function dbConnection() {
  try {
    mongoose.connect("mongodb://0.0.0.0:27017", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB connected successfully ");
  } catch (error) {
    console.log("Not connected ");
  }
}
