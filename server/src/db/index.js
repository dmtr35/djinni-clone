import mongoose from "mongoose";
import User from "./models/user.js";
import Company from "./models/company.js";
import Vacancy from "./models/vacancy.js";
import Applies from "./models/vacancyApplies.js";
import dotenv from "dotenv";

dotenv.config();

export async function connectDB() {
  await mongoose.set('strictQuery', true)
  await mongoose.connect(process.env.MONGO_URL);
}
