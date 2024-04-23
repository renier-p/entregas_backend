const fs = require("fs").promises;
const path = require("path");

class Products {
  constructor(path) {
    this.path = path;
  }

  async addProduct(newObject) {
    let { title, description, price, thumbnail, code, stock, category } =
      newObject;

    if (
      !title ||
      !description ||
      !price ||
      !thumbnail ||
      !code ||
      !stock ||
      !category
    ) {
      console.log("Debe llenar todos los campos");
      return;
    }

    try {
      let products = await this.readProducts();
      const newProduct = {
        id: products.length > 0 ? products[products.length - 1].id + 1 : 1,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        category,
        status: true,
      };

      products.push(newProduct);
      await this.saveProducts(products);
      console.log("Producto agregado correctamente:", newProduct);
    } catch (error) {
      console.log("Error al agregar el producto:", error);
    }
  }

  async getProduct(limit) {
    try {
      const products = await this.readProducts();
      if (limit) {
        return products.slice(0, limit);
      } else {
        return products;
      }
    } catch (error) {
      console.log("Error al obtener los productos:", error);
      return [];
    }
  }

  async getProductById(id) {
    try {
      const arrayProducts = await this.readProducts();
      const idFound = arrayProducts.find((item) => item.id === id);
      if (!idFound) {
        console.log("El producto no existe");
        return null;
      } else {
        console.log("Producto encontrado");
        return idFound;
      }
    } catch (error) {
      console.log("Error en lectura de archivo", error);
      return null;
    }
  }

  async readProducts() {
    try {
      const res = await fs.readFile(this.path, "utf-8");
      return JSON.parse(res);
    } catch (error) {
      console.log("Error al leer el archivo de productos:", error);
      return [];
    }
  }

  async saveProducts(products) {
    try {
      await fs.writeFile(this.path, JSON.stringify(products, null, 2));
      console.log("Productos guardados correctamente.");
    } catch (error) {
      console.log("Error al guardar los productos:", error);
    }
  }

  async updateProduct(id, productUpdate) {
    try {
      let products = await this.readProducts();
      const index = products.findIndex((item) => item.id === id);
      if (index !== -1) {
        products[index] = { ...products[index], ...productUpdate };
        await this.saveProducts(products);
        console.log("Producto actualizado correctamente:", products[index]);
      } else {
        console.log("No se encontró el producto a actualizar");
      }
    } catch (error) {
      console.log("Error al actualizar el producto:", error);
    }
  }

  async deleteProduct(id) {
    try {
      let products = await this.readProducts();
      products = products.filter((item) => item.id !== id);
      await this.saveProducts(products);
      console.log("Producto eliminado correctamente.");
    } catch (error) {
      console.log("Error al eliminar el producto:", error);
    }
  }
}

module.exports = Products;
