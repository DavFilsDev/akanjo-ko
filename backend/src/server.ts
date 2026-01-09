import app from "./app";
import { AppDataSource } from "./config/data-source";
import dotenv from "dotenv";
import { runSeeds } from "./seed";

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Database connected!");

    await runSeeds();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

startServer();
