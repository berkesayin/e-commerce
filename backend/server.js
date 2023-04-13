import express from "express";
import dotenv from "dotenv";
import products from "./data/products.js";
import connectDB from "./config/db.js";
import colors from "colors";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

connectDB();

// app değişkeni ile express'i initialize edelim
const app = express();

app.use(express.json());

// respond with "API is running" when a GET request is made to the homepage
app.get("/", (req, res) => {
  res.send("Hi! API is running...");
});
// Burada localhost:5000'e gittiğimizde "API is running..." yazdırıldığını görürüz.

app.use("/api/products/", productRoutes);
app.use("/api/users/", userRoutes);
app.use("/api/orders/", orderRoutes);

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on ${PORT}`.yellow.bold
  )
);
