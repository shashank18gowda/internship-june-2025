import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    // .connect("mongodb://127.0.0.1:27017/test") //MOngoDB compass
    .connect(process.env.DB_CONNECTION, { dbName: process.env.DB_NAME })
    .then(() => console.log("Connected!"))
    .catch((err) => {
      console.log("Err while connecting DB", err.message);
    });
};
