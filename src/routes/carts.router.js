const express = require("express");
const router = express.Router();
const Carrito = require("../carts.js");

const carrito = new Carrito();

router.post("/carts", async (req, res) => {
  try {
    const newCartId = await carrito.generateCartId();
    const newCart = {
      id: newCartId,
      products: [],
    };
    await carrito.saveCart(newCart);
    res
      .status(201)
      .json({ message: "Nuevo carrito creado", cartId: newCartId });
  } catch (error) {
    console.error("Error al crear un nuevo carrito", error);
    res.status(500).json({ message: "Error del servidor" });
  }
});

router.get("/carts/:cid", async (req, res) => {
  try {
    const cartId = req.params.cid;
    const cart = await carrito.getCart(cartId);
    res.status(200).json(cart.products);
  } catch (error) {
    console.error("Error al obtener productos del carrito", error);
    res.status(500).json({ message: "Error del servidor" });
  }
});

router.post("/carts/:cid/products/:pid", async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const productQuantity = req.body.quantity || 1;

    let cart = await carrito.getCart(cartId);
    if (!cart) {
      cart = { id: cartId, products: [] };
    }

    const existProduct = cart.products.findIndex(
      (product) => product.id === productId
    );

    if (existProduct !== -1) {
      // Si el producto ya existe en el carrito, incrementa la cantidad
      cart.products[existProduct].quantity += productQuantity;
    } else {
      // Si el producto no existe, agrégalo al carrito
      cart.products.push({ id: productId, quantity: productQuantity });
    }

    await carrito.saveCart(cart);
    res.status(200).json({ message: "Producto agregado al carrito" });
  } catch (error) {
    console.error("Error al agregar producto al carrito", error);
    res.status(500).json({ message: "Error del servidor" });
  }
});

module.exports = router;

// const express = require("express");
// const router = express.Router();
// const fs = require("fs").promises;
// const path = require("path");

// router.post("/carts", async (req, res) => {
//   try {
//     const newCartId = await generateCartId();
//     const newCart = {
//       id: newCartId,
//       products: [],
//     };
//     await saveCart(newCart);
//     res
//       .status(201)
//       .json({ message: "Nuevo carrito creado", cartId: newCartId });
//   } catch (error) {
//     console.error("Error al crear un nuevo carrito", error);
//     res.status(500).json({ message: "Error del servidor" });
//   }
// });

// router.get("/carts/:cid", async (req, res) => {
//   try {
//     const cartId = req.params.cid;
//     const cart = await getCart(cartId);
//     res.status(200).json(cart.products);
//   } catch (error) {
//     console.error("Error al obtener productos del carrito", error);
//     res.status(500).json({ message: "Error del servidor" });
//   }
// });

// router.post("/carts/:cid/products/:pid", async (req, res) => {
//   try {
//     const cartId = req.params.cid;
//     const productId = req.params.pid;
//     const productQuantity = req.body.quantity || 1;

//     let cart = await getCart(cartId);
//     if (!cart) {
//       cart = { id: cartId, products: [] };
//     }

//     const existProduct = cart.products.findIndex(
//       (product) => product.id === productId
//     );
//     if (existProduct !== -1) {
//       cart.products[existProduct].quantity += productQuantity;
//     } else {
//       cart.products.push({ id: productId, quantity: productQuantity });
//     }

//     await saveCart(cart);
//     res.status(200).json({ message: "Producto agregado al carrito" });
//   } catch (error) {
//     console.error("Error al agregar producto al carrito", error);
//     res.status(500).json({ message: "Error del servidor" });
//   }
// });

// async function generateCartId() {
//   try {
//   } catch (error) {
//     throw new Error("Error al generar el ID del carrito");
//   }
// }

// async function getCart(cartId) {
//   try {
//     const cartFilePath = path.join(__dirname, "../carrito.json");
//     const data = await fs.readFile(cartFilePath, "utf-8");
//     const carts = JSON.parse(data);
//     const cart = carts.find((cart) => cart.id === cartId);
//     return cart;
//   } catch (error) {
//     return null;
//   }
// }

// async function saveCart(cart) {
//   try {
//     const cartFilePath = path.join(__dirname, "../carrito.json");
//     let carts = [];

//     try {
//       const data = await fs.readFile(cartFilePath, "utf-8");
//       carts = JSON.parse(data);
//     } catch (error) {
//       if (error.code !== "ENOENT") {
//         throw error;
//       }
//     }

//     const existingCartIndex = carts.findIndex(
//       (existingCart) => existingCart.id === cart.id
//     );

//     if (existingCartIndex !== -1) {
//       carts[existingCartIndex] = cart;
//     } else {
//       carts.push(cart);
//     }

//     await fs.writeFile(cartFilePath, JSON.stringify(carts, null, 2));
//   } catch (error) {
//     throw new Error("Error al guardar el carrito en el archivo");
//   }
// }

// module.exports = router;
