/* // usos de los arrays.

//declaracion
const edades = [];
const frutas = ["pera", "manzana", "plátano"];

// usando el constructor
const cp = new Array();
const cc = new Array("a4sdfsd", "sdfsxcbv", "fgbkmdkd");

frutas[0];

// añadir:

edades.push(20); // al final
edades.unshift(15); // al principio

// eliminar
edades.pop(); // del final y devuelve el valor eliminado
edades.shift(); // del principio y devuelve el valor eliminado

// ***** slice *****
// devuelve nuevo array sin mutar el original. Para extraer una parte del array.
edades.slice(1, 2); // desde la posicion 1 hasta la 2 (sin incluir la 2)
edades.slice(-2); // los dos ultimos
edades.slice(1, -4); // desde la posicion 1 hasta la 4 contando desde el final (sin incluir la 4).

// ******************** map ********************
// devuelve un nuevo array con los resultados de la función aplicada a cada elemento del array original.
// callback es una funcion que se aplica dentro de una funcion.

edades.map((edad) => edad * 2); // multiplica por 2 cada elemento del array edades y devuelve un nuevo array con los resultados.

// ******** filter ********
// devuelve un nuevo array con los elementos que cumplen la condición de la función aplicada.
edades.filter((edad) => edad >= 18); */

// *****************************************************************************************************************************************
// *****************************************************************************************************************************************
// *****************************************************************************************************************************************
// *****************************************************************************************************************************************
// *****************************************************************************************************************************************
/* 
1. Dado un array de nombres (crear una funcion) llamada mayusculas, que ponga en mayusculas todos los elementos de
ese array que le paso como parámetro.

2. Crear una funcion llamada precios con IVA, que al pasarle un array de precios me los devuelva con el IVA (21%) incluido.

3. Crear una funcion llamada impares cuadrado que le pase un array de numeros y 
me devuelva solo los impares elevados al cuadrado.

4. Crear una funcion llamada normalizar email que le pase un array de emails que pueden llevar espacios al principio o al
 final y que lo devuelva sin espacios ni al principio ni al final.

5. Crear una funcion llamada filtrar longitud que le pase como parametro array de nombres, un tamaño, y 
me devuelva solo a traves de un array nombres cuya longitud sea mayor que la del parametro de tamaño.

6. Normalizar nombres propios, crear funcion llamada normalizarNombresPropios, que le pases como
parametro un array de nombres y me los devuelva con la letra capital en mayuscula. (La primera del nombre y
 la primera de los apellidos).

*/

/**
 * Convierte todos los nombres en un array a mayúsculas.
 * @param {string[]} nombres - Array de nombres.
 * @return {string[]} - Nuevo array con los nombres en mayúsculas.
 */
function mayusculas(nombres = []) {
  nombres.map((nombre) => nombre.toUppercase());
}

/**
 * Aplica el IVA (21%) a cada precio en un array de precios.
 * @param {number[]} precios - Array de precios.
 * @return {number[]} - Nuevo array con los precios con IVA incluido.
 */
function preciosIva(precios = []) {
  precios.map((precio) => precio * 1.21);
}

/**
 * Devuelve un nuevo array con los números impares elevados al cuadrado.
 * @param {number[]} numeros - Array de números.
 * @return {number[]} - Nuevo array con los números impares al cuadrado.
 */
function imparesCuadrado(numeros = []) {
  numeros.filter((num) => {
    if (num % 2 !== 0) {
      return num * num;
    } else {
      return null;
    }
  });
}

/**
 * Normaliza los emails eliminando espacios al principio y al final.
 * @param {string} emails - Array de emails.
 * @return Nuevo array con los emails normalizados.
 */
function normalizarEmail(emails = []) {
    emails.map((email) => {
    while (email[0] === " ") {
      email = email.slice(1);
    }
    while (email[email.length - 1] === " ") {
      email = email.slice(0, -1);
    }
    return email;
  });
}

/**
 * Filtra los nombres cuya longitud es mayor que el tamaño especificado.
 * @param {string} nombres - Array de nombres.
 * @param {number} tamaño - Tamaño mínimo para filtrar.
 * @return  Nuevo array con los nombres que cumplen la condición.
 */
function filtrarLongitud(names = [], size = 0) {
    return names.filter(name => name.length > size); 
}

/**
 * Normaliza los nombres propios capitalizando la primera letra de cada palabra.
 * @param {string[]} nombres - Array de nombres.
 * @return {string[]} - Nuevo array con los nombres normalizados.
 */
function normalizarNombresPropios(nombres = []) {
  return nombres.map((nombre) => {
    let resultado = "";
    let inicioPalabra = 0;

    for (let i = 0; i <= nombre.length; i++) {
      if (i === nombre.length || nombre[i] === " ") {
        let palabra = nombre.slice(inicioPalabra, i);

        if (palabra.length > 0) {
          palabra = palabra[0].toUpperCase() + palabra.slice(1).toLowerCase();

          if (resultado === "") {
            resultado = palabra;
          } else {
            resultado += " " + palabra;
          }
        }

        inicioPalabra = i + 1;
      }
    }

    return resultado;
  });
}

// Tests rápidos
function tests() {
  console.log("➡️ mayusculas:", mayusculas(["juan", "ana", "pepe"])); 
  // ["JUAN", "ANA", "PEPE"]

  console.log("➡️ preciosIva:", preciosIva([100, 50, 20])); 
  // [121, 60.5, 24.2]

  console.log("➡️ imparesCuadrado:", imparesCuadrado([1,2,3,4,5])); 
  // [1, 9, 25]

  console.log("➡️ normalizarEmail:", normalizarEmail(["  test@gmail.com ", "user@yahoo.com  "])); 
  // ["test@gmail.com", "user@yahoo.com"]

  console.log("➡️ filtrarLongitud:", filtrarLongitud(["Ana", "Roberto", "Luis"], 4)); 
  // ["Roberto"]

  console.log("➡️ normalizarNombresPropios:", normalizarNombresPropios(["juan perez", "ANA lopez"])); 
  // ["Juan Perez", "Ana Lopez"]
}

tests();
