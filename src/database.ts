// src/database.ts
import { DataSource } from "typeorm";
import { Customer } from "./entity/Customer";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres", // replace with your PostgreSQL username
  password: "password", // replace with your PostgreSQL password
  database: "spring-boot-playground", // replace with your PostgreSQL database name
  entities: [Customer],
  synchronize: false, // Disable automatic synchronization
  logging: true, // Enable logging for debugging purposes
});

export const connectDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Database connection established");
  } catch (error) {
    console.error("Error during Data Source initialization:", error);
    throw error; // Ensure error is thrown so that application doesn't proceed without a database connection
  }
};
