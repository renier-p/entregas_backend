const express = require("express");
const router = express.Router();
const Products = require("../products.js");
const products = new Products("./src/productos.json");

router.get("/products", async (req, res) => {
  try {
    const productList = await products.getProduct();
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
  const newProduct = req.body;
  try {
    await products.addProduct(newProduct);
    res.json({ message: "Producto agregado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al agregar producto" });
  }
});

router.put("/products/:id", async (req, res) => {
  const productId = parseInt(req.params.id);

  try {
    const productList = await products.readProducts();

    const productIndex = productList.findIndex(
      (product) => product.id === productId
    );

    if (productIndex !== -1) {
      const {
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        category,
        status,
      } = req.body;
      productList[productIndex] = {
        ...productList[productIndex],
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        category,
        status,
      };

      await products.saveProducts(productList);

      res.json({ message: "Producto actualizado correctamente" });
    } else {
      res.status(404).json({ message: "Producto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el producto", error });
  }
});

router.delete("/products/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    await products.deleteProduct(productId);
    res.json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(404).json({ message: "Error al eliminar el producto" });
  }
});

module.exports = router;
