// .at <--- acceso con indices negativos

const frutas = ["🍉", "🍊", "🍋", "🍋‍🟩", "🍌"];
console.log(frutas.at(-2)); // 🍋‍🟩
console.log(frutas.slice(-2)); // [ '🍋‍🟩', '🍌' ]

// splice <--- se utiliza para extraer y eliminar partes de un array sin mutar el original

frutas.splice(1, 2); // devuelve 2 elementos desde la posicion 1
console.log(frutas); // [ '🍉', '🍋‍🟩', '🍌' ] <-- elimina del array original
frutas.splice(1, 2, "pera"); // <-- elimina 2 elementos desde la posicion 1 y añade "pera"
frutas.splice(1, 2, "pera", "manzana", "kiwi"); // <-- elimina 2 elementos desde la posicion 1 y añade "pera", "manzana", "kiwi"

// concat <--- concatena arrays sin mutar el original, lo añade al final del array original
frutas.concat([1, 2, 3, 4, 5, 6]); // [ '🍉', '🍋‍🟩', '🍌', 1, 2, 3, 4, 5, 6 ]

// MEJOR HECHO CON SPREAD OPERATOR
const edades = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];
const arrayConcat = [...frutas, ...edades];
console.log(arrayConcat); // [ '🍉', '🍋‍🟩', '🍌', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20 ]

// SET <--- OTRO TIPO DE DATO (datos unicos)

const pesos = [45, 21, 78, 45, 21, 78, 45, 21, 78];
const sinDuplicados = [...new Set(pesos)]; // IMPORTANTE

// .reduce <--- reducir un array a un único valor (numero, string, objeto, array...)

//pesos.reduce((acumulador, elemento, indice, array) => aqui va la lógica, valorInicial);
//El acumulador y elemento NO son opcionales, el resto si.
// no muta el array original

//pesos.reduce(() => {}, 0); // 0 es el valor inicial del acumulador
pesos.reduce((suma, peso) => suma + peso, 0); // suma todos los elementos del array pesos y devuelve el resultado
pesos.reduce((suma, peso) => suma + peso); // si no se pone el valor inicial, el acumulador empieza en el primer elemento del array.

// EJERCICIOS
// 1. Hacer la suma
// 2. Producto total de todos los elementos de un array
// 3. Encontrar el maximo y el minimo
// 4. Dado un array que sea ["manzana", "planano", "naranja", manzana", "manzana", "platano", "pera", "pera"] devovlerme un objeto clave valor que me diga nombre de la fruta: cuantas veces aparece esa fruta.
// 5. Dado el siguiente array bidimensional [[1,2],[3,4],[5,6]]. Se pide, aplanar dicho array en un array unidimensional [1,2,3,4,5,6].

// *****************************************************************************************************************
const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
//1
array.reduce((suma, num) => suma + num, 0);
//2
array.reduce((suma, num) => suma * num, 1);
//3
array.reduce((max, numero) => (numero > max ? numero : max), array[0]);
array.reduce((min, numero) => (numero > min ? numero : min), array[0]);
//4
const frutasEj = [
  "manzana",
  "planano",
  "naranja",
  "manzana",
  "manzana",
  "platano",
  "pera",
  "pera",
];
frutasEj.reduce((acc, fruta) => {
  acc[fruta] = (acc[fruta] || 0) + 1;
  return acc;
}, {});

//5
const array2D = [
  [1, 2],
  [3, 4],
  [5, 6],
];
const array1D = array2D.reduce((acc, array) => acc.concat(array), []);
console.log(array1D);

// array de objetos. ESTO SACA LA PRIMERA OCURRENCIA.

// dame la informacion del usuario cuyo nombre es JUAN
//usuarios.find((usuario) => usuario.nombre.toLowerCase() === "juan");

//saca usuario cuya edad es mayor a 28
//let resultado = usuarios.find((usuario) => Number(usuario.edad) >= 28) ?? {};

const usuarios = [
  { id: 1, nombre: "Ana", edad: 25, data: { books: 100 } },
  { id: 2, nombre: "Juan", edad: 30, data: { books: 50 } },
  { id: 3, nombre: "María", edad: 28, data: { books: 20 } },
  { id: 4, nombre: "Sara", edad: 28, data: { books: 20 } },
  { id: 5, nombre: "Carlos", edad: 20, data: { books: 10 } },
  { id: 6, nombre: "Mario", edad: 38, data: { books: 0 } },
];
//EJERCICIOS
// 1. Dado el siguiente array de usuarios devolver un array con solo los nombres de los usuarios que tienen en su biblioteca más de 20 libros.
const usuariosLibros = usuarios
  .filter((usuario) => usuario.data.books > 20)
  .map((usuario) => usuario.nombre);

console.log(usuariosLibros);

//2. Obtener el valor total de todos los libros si suponemos un precio medio de 28€.
const promedio = usuarios.reduce((total, usuario) => {
  return (total += Number(usuario.data.books) * 28);
}, 0);
console.log(promedio);
//3. Obtener los usuarios que no tienen libros
const sinLibros = usuarios.filter(
  (usuario) => Number(usuario.data.books) === 0
);
console.log(sinLibros);


const productos = [
    {id: 1, nombre: 'Laptop', precio: 1200, stock: 5, categoria: 'Tecnología'},
    {id: 2, nombre: 'Camiseta', precio: 35, stock: 15, categoria: 'Ropa'},
    {id: 3, nombre: 'Monitor', precio: 300, stock: 0, categoria: 'Tecnología'},
    {id: 4, nombre: 'Libro', precio: 20, stock: 50, categoria: 'Literatura'},
    {id: 5, nombre: 'Móvil', precio: 800, stock: 10, categoria: 'Tecnología'},
    {id: 6, nombre: 'Pantalón', precio: 60, stock: 5, categoria: 'Ropa'}    
];

// Se pide:
// 1.-Obtener un array con los nombres de todos los productos que están agotados.
// 2.-Calcular el valor total del inventario (precio * stock) de todos los productos.
// 3.-Filtar los productos que pertenecen a la categoría 'Tecnología' y tienen un precio mayor a 500.
// 4.- Crear un nuevo array de productos aplicando un descuento del 10% a todos los productos de la categoría 'Ropa'.