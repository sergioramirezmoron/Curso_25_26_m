// Crear una funcion llamada nota, que devuelva aprobados, le pasas como parámetro un número y te dice si estás aprobado o no.
// Crear una version 2.0 que si le paso un numero mayor o igual que 9 me diga sobresaliente, si es entre 5-9 diga aprobado, si es menor que 5 diga suspenso.

// evaluar 1.0
const evaluar = (nota = 0) => (nota >= 5 ? "Aprobado" : "Suspenso");

// evaluar 2.0
const evaluar2 = (nota = 0) => {
  return nota >= 9 ? "Sobresaliente" : nota >= 5 ? "Aprobado" : "Suspenso";
};

console.log(evaluar(4));
console.log(evaluar2(5));
console.log(evaluar2(9));