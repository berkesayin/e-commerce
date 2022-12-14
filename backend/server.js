// express'i kullanmak için getirelim
import express from 'express';

import dotenv from 'dotenv';

// importing products
import products from './data/products.js';


dotenv.config();

// app değişkeni ile express'i initialize edelim
const app = express();

// respond with "API is running" when a GET request is made to the homepage
app.get("/", (req, res) => {
  res.send("Hi! API is running...");
});
// Burada localhost:5000'e gittiğimizde "API is running..." yazdırıldığını görürüz.

// creating the route to get all the products as json (we use at HomeScreen)
app.get("/api/products", (req, res) => {
  res.json(products);
});

// creating the route to get specific product by product._id as json (we use at ProductScreen)
app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on ${PORT} `));
