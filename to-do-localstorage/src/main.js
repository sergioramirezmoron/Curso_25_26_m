// ------------ IMPORTACIONES

//import { dbTareas } from "./db/db";
import { buscarCompletadas } from "./helpers/tareas";
const TEXT_KEY = import.meta.env.VITE_TEXT_KEY;


//rellenarLocalStorage(dbTareas, TEXT_KEY);

//mostrarTareas(TEXT_KEY);

console.table(buscarCompletadas(TEXT_KEY));
