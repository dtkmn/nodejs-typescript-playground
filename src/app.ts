// src/app.ts
import express from "express";
import { connectDatabase } from "./database";
import { CustomerService } from "./service/CustomerService";
import { customerRouter } from "./controller/CustomerController";

const app = express();
const port = 3000;

app.use(express.json());

const startServer = async () => {
  try {
    await connectDatabase();
    const customerService = new CustomerService();
    app.use("/customers", customerRouter(customerService));

    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to start the server due to database connection error:", error);
  }
};

startServer();
