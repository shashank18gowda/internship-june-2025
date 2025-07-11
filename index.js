import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./src/helper/dbConnection.js";
import routes from "./router.js";
dotenv.config();

const app = express();
let PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

routes(app);
connectDB();

app.listen(PORT, () => {
  console.log("Server listening on", PORT);
});
