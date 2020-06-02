import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;
db.once("open", () => {
  console.log("db connected");
});

db.on("error", (error) => {
  console.log(`db connect failed ${error}`);
});
