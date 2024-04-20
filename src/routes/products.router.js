const express = require("express");
const router = express.Router();

const products = [];

router.get("/products", (req, res) => {
  res.json(products);
});

router.post("/products", (req, res) => {
  const newProduct = req.body;
  products.push(newProduct);
  res.json({ message: "Producto agregado" });
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
