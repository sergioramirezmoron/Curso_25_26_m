/* Generar un objeto que tenga los siguientes campos:
{
valor: numero_correspondiente
posicion: posicion_dentro_del_array
esUltimo: array_que_me_diga_si_es_el_ultimo (true|false)
}
*/
const numeros = [1, 2, 3, 4, 5];

const resumenNumeros = numeros.map((numero, index, miArray) => {
  return {
    valor: numero,
    posicion: index,
    esUltimo: index === miArray.length - 1,
  };
});

//console.log(resumenNumeros);

// EJ 2
const products = [
  { name: "laptop", price: 1000, stock: 5, active: true },
  {
    name: "Mouse Logitech",
    price: 28.56,
    stock: 0,
    active: false,
  },
];

/* 
Mapeado:
nombre,
precioOriginal
precioConIva
hayStock
*/

const productsResume = products.map((product) => {
  return {
    name: product.name,
    originalPrice: product.price,
    priceVat: product.price * 1.21,
    avableStock: product.stock > 0,
  };
});

// console.log(productsResume);

// Filtrame los productos que tienen stock y están activos.
const filterProd1 = products.filter((product) => {
  return product.stock > 0 && product.active;
});

//console.log(filterProd1);

// Buscar todos los Laptop de forma case Insensitive (da igual que sea mayuscula o minuscula);
const filterCase = products.filter((product) => {
  return product.name.toLowerCase().includes("laptop".toLowerCase());
});

//console.log(filterCase);

//Crear una función que le pases como parámetro un array de objetos, y como segundo parámetro, el nombre de un objeto Y me devuelva todos los objetos con esas características
const arrayFunction = (products, wordToFind) =>
  products.filter((product) =>
    product.name.toLowerCase().includes(wordToFind.toLowerCase())
  );

//console.log(arrayFunction(products, "Laptop"));

// Function que le pase como parámetro un array de productos, precio inicial, precio final, y me devuelva los productos cuyo precio está en ese rango de valores (sin incluirlos), la funcion se va a llamar filterPrice.
const filterPrice = (products = [], initialPrice = 0, finalPrice = 0) =>
  products.filter(
    (product) =>
      product.price > Number(initialPrice) && product.price < Number(finalPrice)
  );

//console.log(filterPrice(products, 0, 100));

// modificar FindProducts para que además me muestre solo los que están activos
const filterProductsModified = (products = [], wordToFind = "") =>
  products.filter(
    (product) =>
      product.name.toLowerCase().includes(wordToFind.toLowerCase()) &&
      product.active
  );
//console.log(filterProductsModified(products, "laptop"));

/*

*/
const carrito = [
  { name: "laptop", price: 1000, quantity: 5, category: "Electrónica" },
  {
    name: "Mouse Logitech",
    price: 28.56,
    quantity: 1,
    category: "Electrónica",
  },
  {
    name: "Monitor MSI 24",
    price: 210.6,
    quantity: 10,
    category: "Electrónica",
  },
  {
    name: "Teclado Mecánico",
    price: 150,
    quantity: 2,
    category: "Electrónica",
  },
  {
    name: "Polo Scalper",
    price: 150,
    quantity: 2,
    category: "Ropa",
  },
  {
    name: "Pantalón Stradivarius",
    price: 45,
    quantity: 5,
    category: "Ropa",
  },
];

// Crear funcion Le mandas un carrito de la compra y te debe devolver un precio total.
/**
 * Funcion para dar un carrito y que devuelva el precio total
 * @author: Sergio Ramirez Moron
 * @param {Object[]} cart - Carrito de objetos
 * @param {Number} vat(iva) - IVA a multiplicar
 * @return {Number} - Total del carrito
 */

const totalCart = (shoppingCart = [], iva = 1.21) =>
  shoppingCart.reduce(
    (total, product) =>
      product.quantity > 5
        ? (total + product.price) * 0.95
        : total + product.price * iva,
    0
  );

//console.log(totalCart(carrito, 1.21));

/**
 * Función Agrupar el carrito por categorías
 * @author: Sergio Ramirez Moron
 * @param {Object[]} cart - Carrito de objetos
 * @return {Number} - Total del carrito
 */

/*
{
Electrónica: [
{

    }
     ],
Ropa: [
{

    }
     ],
}
*/

const productsCategory = (cart = []) =>
  cart.reduce((groups, product) => {
    const categoryFilter = product.category;

    if (!groups[categoryFilter]) {
      groups[categoryFilter] = [];
    }
    groups[categoryFilter].push(product);
    return groups;
  }, {});

// console.log(productsCategory(carrito));

/**
 * Función contar votos
 * @author: Sergio Ramirez Moron
 * @param {array[]} votes - Votos
 * @return {Object} - Objeto de votos totales
 */
const votos = ["Ana", "Carlos", "Beatriz", "Carlos", "Ana"];

// Crear funcion que cuente cuantos votos tiene cada persona.
const votesSelection = (votes = []) =>
  votes.reduce((countsVote, vote) => {
    countsVote[vote] = (countsVote[vote] || 0) + 1;
    return countsVote;
  }, {});

// console.log(votesSelection(votos));

/**
 * Buscar el usuario id=2 y obtener su rol.
 * @author: Sergio Ramirez Moron
 * @param {array[]} users - Usarios
 * @param {Number} id - Id de usuario
 * @return {String} - Rol
 */

// Crear funcion que le pase un parametro de array de usuarios, id busqueda y devuelve el rol que tiene.
const usuarios = [
  { id: 1, nombre: "Ana", rol: "admin" },
  { id: 2, nombre: "Juan", rol: "user" },
  { id: 3, nombre: "Paco", rol: "admin" },
];

const findUser = (users = [], id = 1) => {
  return users.find((user) => {
    if ((encontrado = Number(user.id) === Number(id))) {
      return user.rol;
    } else {
      return `Usuario no encontrado:  ${id}`;
    }
  });
};

//console.log(findUser(usuarios, 4));

/**
 * Buscar el indice del usuario.
 * @author: Sergio Ramirez Moron
 * @param {array[]} users - Usarios
 * @param {Number} id - Id de usuario
 * @return {Number} - Indice
 */
//buscar el indice del array donde se encuentra el usuario con id buscado
const findUserIndex = (users = [], id = 1) => {
  return users.findIndex((user) => user.id === id);
};

// Devuelve -1 si findIndex devuelve error o no encuentra la accion requerida

//******* some() -> Devuelve true si al menos un elemento cumple una condición *******

const numerosPares = [4, 5, 6, 7, 8];

// ¿Hay numeros pares en ese array?
const hayPares = numerosPares.some((num) => num % 2 === 0); // ---> Devuelve true o false si hay algun numero par.
