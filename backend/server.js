import express from "express";
import dotenv from "dotenv";
import products from "./data/products.js";
import connectDB from "./config/db.js";
import colors from "colors";
import productRoutes from "./routes/productRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

connectDB();

// app değişkeni ile express'i initialize edelim
const app = express();


// respond with "API is running" when a GET request is made to the homepage
app.get("/", (req, res) => {
  res.send("Hi! API is running...");
});
// Burada localhost:5000'e gittiğimizde "API is running..." yazdırıldığını görürüz.

app.use("/api/products/", productRoutes);

app.use(notFound)

app.use(errorHandler)


const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on ${PORT}`.yellow.bold
  )
);
