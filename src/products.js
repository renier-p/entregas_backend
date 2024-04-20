const fs = require("fs").promises;
const path = require("path");

class Products {
  static lastId = 0;

  constructor(path) {
    this.products = [];
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
    const productoEncontrado = this.products.find((id) => id.code === code);
    if (productoEncontrado) {
      console.log("Codigo repetido");
      return;
    }

    const newProduct = {
      id: ++Products.lastId,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      category,
      status: true,
    };

    this.products.push(newProduct);
    console.log(newProduct);

    await this.saveProducts(this.products);
  }
  async getProduct() {
    console.log(this.products);
  }
  async getProductById(id) {
    try {
      const arrayProducts = await this.readProducts();
      const idFound = arrayProducts.find((item) => item.id === id);
      if (!idFound) {
        console.log("El producto no existe");
      } else {
        console.log("Producto encontrado");
        return idFound;
      }
    } catch (error) {
      console.log("Error en lectura de  archivo", error);
    }
  }

  async readProducts() {
    try {
      const res = await fs.readFile(this.path, "utf-8");
      const arrayDeProductos = JSON.parse(res);
      return arrayDeProductos;
    } catch (error) {
      console.log("Error al leer el archivo", error);
    }
  }

  async saveProducts() {
    try {
      await fs.writeFile(this.path, JSON.stringify(this.products, null, 2));
      console.log("Productos guardados correctamente.");
    } catch (error) {
      console.log("Error al guardar los productos.", error);
    }
  }

  // async saveProducts(arrayProducts) {
  //   try {
  //     await fs.writeFile(this.path, JSON.stringify(arrayProducts, null, 2));
  //   } catch (error) {
  //     console.log("Error al guardar el archivo", error);
  //   }
  // }

  async updateProduct(id, productUpdate) {
    try {
      const arrayProducts = await this.readProducts();

      const index = arrayProducts.findIndex((item) => item.id === id);
      if (index !== -1) {
        arrayProducts.splice(index, 1, productUpdate);
        await this.saveProducts(arrayProducts);
      } else {
        console.log("No se encontro el producto a actualizar");
      }
    } catch (error) {
      console.log("Error, no se pudo actualizar el producto", error);
    }
  }

  async deleteProduct(id) {
    try {
      const arrayProducts = await this.readProducts();
      const deleteUpDate = arrayProducts.filter((item) => item.id != id);
      await this.saveProducts(deleteUpDate);
    } catch (error) {
      console.log("No se puede pudo borrar el producto");
    }
  }
}

module.exports = Products;
