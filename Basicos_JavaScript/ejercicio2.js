// Crear un juego de un dado que utilizando una funcion llamada tirar dado permita tirar un dado de 6 caras con valores 1-6.
// Crear además una funcion llamada simular que se pase como parametro el número de tiradas y me diga que número se ha repetido más veces.

// -------------------------- variables --------------------------
const carasDado = [1, 2, 3, 4, 5, 6];

// -------------------------- functions --------------------------
/**
 * Simula el lanzamiento de un dado un número determinado de veces y cuenta las repeticiones de cada número.
 * @param {number} numTiradas - El número de veces que se lanzará el dado.
 * @return {string} - Un mensaje indicando cuántas veces se ha repetido el número más frecuente.
 */
function simular(numTiradas) {
  const numeros = [];
  for (numTiradas; numTiradas > 0; numTiradas--) {
    numeros.push(tirarDado());
  }

  for (let i = 0; i < numeros.length; i++) {
    let contador = 0;
    for (let j = 0; j < numeros.length; j++) {
      if (numeros[i] === numeros[j]) {
        contador++;
      }
    }
    return `El número ${numeros[i]} se ha repetido ${contador} veces`;
  }
}

/** Simula el lanzamiento de un dado de 6 caras.
 * @return {number} - Un número aleatorio entre 1 y 6.
 */
function tirarDado() {
  let numero = Math.floor(Math.random() * carasDado.length) + 1;
  return numero;
}

// -------------------------- inicializar aplicación  --------------------------

console.log(simular(50));
