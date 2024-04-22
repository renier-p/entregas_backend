const fs = require("fs").promises;
const path = require("path");

class Carrito {
  async generateCartId() {
    try {
    } catch (error) {
      throw new Error("Error al generar el ID del carrito");
    }
  }

  async getCart(cartId) {
    try {
      const cartFilePath = path.join(__dirname, "../src/carrito.json");
      const data = await fs.readFile(cartFilePath, "utf-8");
      const carts = JSON.parse(data);
      const cart = carts.find((cart) => cart.id === cartId);
      return cart;
    } catch (error) {
      return null;
    }
  }

  async saveCart(cart) {
    try {
      const cartFilePath = path.join(__dirname, "../src/carrito.json");
      let carts = [];

      try {
        const data = await fs.readFile(cartFilePath, "utf-8");
        carts = JSON.parse(data);
      } catch (error) {
        if (error.code !== "ENOENT") {
          throw error;
        }
      }

      const existCart = carts.findIndex(
        (existingCart) => existingCart.id === cart.id
      );

      if (existCart !== -1) {
        carts[existCart] = cart;
      } else {
        carts.push(cart);
      }

      await fs.writeFile(cartFilePath, JSON.stringify(carts, null, 2));
    } catch (error) {
      throw new Error("Error al guardar el carrito en el archivo");
    }
  }
}

module.exports = Carrito;
