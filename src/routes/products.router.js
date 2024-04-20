const express = require("express");
const router = express.Router();
const Products = require("../products.js");
const products = new Products("MIS_PRODUCTOS.json");

// const products = [];

router.get("/products", (req, res) => {
  products.getProduct(products);
  res.json(products);
});

router.post("/products", (req, res) => {
  const newProduct = req.body;
  products.addProduct(newProduct);
  // products.push(newProduct);
  res.json({ message: "Producto agregado correctamente" });
});

router.put("/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find((product) => product.id === productId);

  if (product) {
    const { title } = req.body;
    product.title = title;
    res.json(product);
  } else {
    res.status(404).json({ message: "Producto no encontrado" });
  }
});

router.delete("/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  products = products.filter((product) => product.id !== productId);
  res.json({ message: "Producto eliminado correctamente" });
});

module.exports = router;
