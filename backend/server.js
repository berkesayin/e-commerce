// express'i kullanmak için getirelim
const express = require("express");

// app değişkeni ile express'i initialize edelim
const app = express();

// importing products
const products = require("./data/products");

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

app.listen(5000, console.log("Server running on port 5000"));
