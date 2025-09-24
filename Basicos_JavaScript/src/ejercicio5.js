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
