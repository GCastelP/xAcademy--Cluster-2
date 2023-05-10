// 3.1) Dado el siguiente objeto
// let carrito = {
//     montoTotal: 10,
//     productos: ["Leche"]
// }


// Crear las clases necesarias para generar carritos respetando la estructura del objeto dado.

class Carrito {
    constructor() {
      this.montoTotal = 0;
      this.productos = [];
    }
    
    agregarProducto(producto) {
      this.productos.push(producto);
      this.montoTotal += producto.precio * producto.unidades;
    }
  }
  
  class Producto {
    constructor(nombre, precio, unidades) {
      this.nombre = nombre;
      this.precio = precio;
      this.unidades = unidades;
    }
  }


// 3.2) Agregar un metodo a la clase que agregue un producto al carrito y actualice el montoTotal
// agregarProducto(nombre, precio, unidades) {
// Completar aca...
// }


// Ej:
// agregarProducto("Azucar", 5, 2);

// Resultado esperado
// carrito = {
//     montoTotal: 20,
//     productos: ["Leche", "Azucar"]
// }

class Carrito {
    constructor() {
      this.montoTotal = 0;
      this.productos = [];
    }
    
    agregarProducto(producto) {
      this.productos.push(producto);
      this.montoTotal += producto.precio * producto.unidades;
    }
    
    agregarProducto(nombre, precio, unidades) {
      const producto = new Producto(nombre, precio, unidades);
      this.agregarProducto(producto);
    }
  }





// 3.3)Agregar al ejercicio anterior una validación para no permitir duplicados e imprimir un mensaje si el item ya existe “ya existe xxx con yyy unidades”

class Carrito {
    constructor() {
      this.montoTotal = 0;
      this.productos = [];
    }
    
    agregarProducto(producto) {
      const productoExistente = this.productos.find(p => p.nombre === producto.nombre);
      if (productoExistente) {
        productoExistente.unidades += producto.unidades;
        console.log(`Ya existe ${producto.nombre} con ${productoExistente.unidades} unidades`);
      } else {
        this.productos.push(producto);
      }
      this.montoTotal += producto.precio * producto.unidades;
    }
    
    agregarProducto(nombre, precio, unidades) {
      const producto = new Producto(nombre, precio, unidades);
      this.agregarProducto(producto);
    }
  }
  
  class Producto {
    constructor(nombre, precio, unidades) {
      this.nombre = nombre;
      this.precio = precio;
      this.unidades = unidades;
    }
  }


