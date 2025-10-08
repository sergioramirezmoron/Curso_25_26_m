// Ejercicio Destructuring

import { productos } from "./data/data";
import { extraerData, maxRam } from "./helpers/myfunction";

// ------------- INICIO DE LA APLICACION -------------
const newDataArray = (arrayProducts) =>
  arrayProducts.map((product) => extraerData(product));

//console.log(newDataArray(productos));

console.log(maxRam(productos));
