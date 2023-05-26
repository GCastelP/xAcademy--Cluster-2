// A continuacion podemos encontrar el código de un supermercado que vende productos.
// El código contiene
//     - una clase Producto que representa un producto que vende el super
//     - una clase Carrito que representa el carrito de compras de un cliente
//     - una clase ProductoEnCarrito que representa un producto que se agrego al carrito
//     - una función findProductBySku que simula una base de datos y busca un producto por su sku
// El código tiene errores y varias cosas para mejorar / agregar
// ​
// Ejercicios
// 1) Arreglar errores existentes en el código
//     a) Al ejecutar agregarProducto 2 veces con los mismos valores debería agregar 1 solo producto con la suma de las cantidades.      
//     b) Al ejecutar agregarProducto debería actualizar la lista de categorías solamente si la categoría no estaba en la lista.
//     c) Si intento agregar un producto que no existe debería mostrar un mensaje de error.




// Cada producto que vende el super es creado con esta clase
// Se establece por defecto para el stock un valor de 10

    class Producto {
    sku;            // Identificador único del producto
    nombre;         // Su nombre
    categoria;      // Categoría a la que pertenece este producto
    precio;         // Su precio
    stock;          // Cantidad disponible en stock

    constructor(sku, nombre, precio, categoria, stock = 10) {
        this.sku = sku;
        this.nombre = nombre;
        this.categoria = categoria;
        this.precio = precio;
        this.stock = stock;        
    }

}


// Creo todos los productos que vende mi super

// Se corrige la ubicación de la categoria, pasando a estar delante del precio

const queso = new Producto('KS944RUR', 'Queso', 'lacteos', 10,  4);
const gaseosa = new Producto('FN312PPE', 'Gaseosa', 'bebidas', 5 );
const cerveza = new Producto('PV332MJ', 'Cerveza', 'bebidas', 20 );
const arroz = new Producto('XX92LKI', 'Arroz','alimentos', 7, 20);
const fideos = new Producto('UI999TY', 'Fideos', 'alimentos', 5 );
const lavandina = new Producto('RT324GD', 'Lavandina', 'limpieza', 9 );
const shampoo = new Producto('OL883YE', 'Shampoo', 'higiene', 3, 50);
const jabon = new Producto('WE328NJ', 'Jabon','higiene', 4, 3);

// Genero un listado de productos. Simulando base de datos
const productosDelSuper = [queso, gaseosa, cerveza, arroz, fideos, lavandina, shampoo, jabon];


// Cada cliente que venga a mi super va a crear un carrito
class Carrito {
    productos;      // Lista de productos agregados
    categorias;     // Lista de las diferentes categorías de los productos en el carrito
    precioTotal;    // Lo que voy a pagar al finalizar mi compra

    // Al crear un carrito, empieza vació
    constructor() {
        this.precioTotal = 0;
        this.productos = [];
        this.categorias = [];
    }

    /**
     * función que agrega @{cantidad} de productos con @{sku} al carrito
     */
    async agregarProducto(sku, cantidad) {
        console.log(`Agregando ${cantidad} ${sku}`);

        // Busco el producto en la "base de datos"
        const producto = await findProductBySku(sku);

        // Si el producto NO EXISTE, se muestra un mensaje por consola.
        if (!producto) {
            console.log(`ERROR!, el producto con SKU ${sku} no existe. No se puede agregar al carrito`);
            return;
        }
        console.log("Producto encontrado", producto);

        // Verificar si el producto ya está en el carrito
        const productoExistente = this.productos.find(p => p.sku === sku);

        if (productoExistente) {
            // Actualizar la cantidad del producto existente
            productoExistente.cantidad += cantidad;
        } else {
            // Crear un nuevo producto en el carrito
            const nuevoProducto = new ProductoEnCarrito(sku, producto.nombre, cantidad);
            this.productos.push(nuevoProducto);
        }
        this.precioTotal += producto.precio * cantidad;


        // Verificar si la categoría ya está en la lista
        const categoriaExistente = this.categorias.includes(producto.categoria);

        // Creo un producto nuevo
        const nuevoProducto = new ProductoEnCarrito(sku, producto.nombre, cantidad);
        this.productos.push(nuevoProducto);
        this.precioTotal = this.precioTotal + (producto.precio * cantidad);
        
        // Agregar categoría solo si no está en la lista
        if (!categoriaExistente) {
            this.categorias.push(producto.categoria);
        }
    }

    /* 2) Agregar la función eliminarProducto a la clase Carrito
    a) La función eliminarProducto recibe un sku y una cantidad (debe devolver una promesa)
    b) Si la cantidad es menor a la cantidad de ese producto en el carrito, se debe restar esa cantidad al producto
    c) Si la cantidad es mayor o igual a la cantidad de ese producto en el carrito, se debe eliminar el producto del carrito
    d) Si el producto no existe en el carrito, se debe mostrar un mensaje de error
    e) La función debe retornar una promesa */
       
    
        /**
         * Función que elimina @{cantidad} del producto con @{sku} del carrito
         * @param {string} sku - SKU del producto a eliminar
         * @param {number} cantidad - Cantidad a eliminar
         * @returns {Promise} - Promesa que se resuelve con el carrito actualizado
         */
        eliminarProducto(sku, cantidad) {
            return new Promise((resolve, reject) => {
                console.log(`Eliminando ${cantidad} ${sku}`);
    
                // Buscar el producto en el carrito
                const productoIndex = this.productos.findIndex(p => p.sku === sku);
    
                // Verificar si el producto existe en el carrito
                if (productoIndex === -1) {
                    reject(`El producto con SKU ${sku} no existe en el carrito.`);
                    return;
                }
    
                const producto = this.productos[productoIndex];
    
                if (cantidad < producto.cantidad) {
                    // Restar la cantidad del producto
                    producto.cantidad -= cantidad;
                    this.precioTotal -= producto.precio * cantidad;
                } else {
                    // Eliminar el producto del carrito
                    this.productos.splice(productoIndex, 1);
                    this.precioTotal -= producto.precio * producto.cantidad;
                }
    
                resolve(this);
            });
        }

         

    }
    
    // ...
    
    
    
    // Eliminar 2 unidades del producto 'WE328NJ'
    carrito.eliminarProducto('WE328NJ', 2)
        .then(updatedCarrito => {
            console.log(updatedCarrito.productos);     // Resultado: []
            console.log(updatedCarrito.precioTotal);   // Resultado: 0
        })
        .catch(error => {
            console.log(error);
        });
    


}

// Cada producto que se agrega al carrito es creado con esta clase
class ProductoEnCarrito {
    sku;       // Identificador único del producto
    nombre;    // Su nombre
    cantidad;  // Cantidad de este producto en el carrito

    constructor(sku, nombre, cantidad) {
        this.sku = sku;
        this.nombre = nombre;
        this.cantidad = cantidad;
    }

}

// Función que busca un producto por su sku en "la base de datos"
function findProductBySku(sku) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const foundProduct = productosDelSuper.find(product => product.sku === sku);
            if (foundProduct) {
                resolve(foundProduct);
            } else {
                reject(`Product ${sku} not found`);
            }
        }, 1500);
    });
}

const carrito = new Carrito();
carrito.agregarProducto('WE328NJ', 2);  