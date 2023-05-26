// 2) Escribir una funcion que reciba 2 array y devuelva un array con todos los elementos que coinciden entre ellos

// Ejemplo:
// Array1: ['rojo', 'azul', 'amarillo']
// Array2: ['blanco', 'negro', 'rojo']
// Resultado: ['rojo']

// Ejemplo 2:
// Array1: [4, 3, true, 'manzana']
// Array2: ['pera', 3, f alse, true, 3, true]
// Resultado: [3, true]


function encontrarCoincidencias(array1, array2) {
    const coincidencias = [];
    for (let i = 0; i < array1.length; i++) {
      if (array2.includes(array1[i])) {
        coincidencias.push(array1[i]);
      }
    }
    return coincidencias;
  }

  

const array1 = ['rojo', 'azul', 'amarillo'];
const array2 = ['blanco', 'negro', 'rojo'];
console.log(encontrarCoincidencias(array1, array2)); // ['rojo']

const array3 = [4, 3, true, 'manzana'];
const array4 = ['pera', 3, false, 'manzana'];
console.log(encontrarCoincidencias(array3, array4)); // [3, 'manzana']