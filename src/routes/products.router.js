const express = require("express");
const router = express.Router();
const Products = require("../products.js");
const products = new Products("./src/productos.json");

router.get("/products", async (req, res) => {
  try {
    let limit = req.query.limit ? parseInt(req.query.limit) : null;
    const productList = await products.getProduct(limit);
    res.json(productList);
  } catch (error) {
    res.status(404).json({ message: "Error al obtener productos" });
  }
});

router.get("/products/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const product = await products.getProductById(productId);
    if (!product) {
      res.status(404).json({ message: "Producto no encontrado" });
    } else {
      res.json(product);
    }
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el producto" });
  }
});

router.post("/products", async (req, res) => {
  try {
    const newProduct = req.body;
    await products.addProduct(newProduct);
    res.status(201).json({ message: "Producto agregado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al agregar producto", error });
  }
});

router.put("/products/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const productUpdate = req.body;
    await products.updateProduct(productId, productUpdate);
    res.status(200).json({ message: "Producto actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el producto", error });
  }
});

router.delete("/products/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    await products.deleteProduct(productId);
    res.status(200).json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el producto", error });
  }
});

module.exports = router;
