import { uid } from "uid";
const TEXT_KEY = import.meta.env.VITE_TEXT_KEY;

// Aqui van las funciones helpers para las tareas

export const rellenarLocalStorage = (arrayTareas, tareas = "Tareas") => {
  // Guardar en el localStorage en la clave
  localStorage.setItem(tareas, JSON.stringify(arrayTareas));
};

// Crear una funcion llamada mostrarTareas que le pase como parametro una clave y me muestre a través de la consola la clave.
//Utilizar console.table("hola");

const mostrarTareas = (clave = "Tareas") => {
  console.table(JSON.parse(localStorage.getItem(clave)));
};

export const getTareas = () => {
  const dataSinParsear = localStorage.getItem(TEXT_KEY);
  const dataParseada = safeJSONParse(dataSinParsear);
  if (!Array.isArray(dataParseada)) {
    console.Error("Error en la data");
    return [];
  }
  return dataParseada;
};

export const saveTareas = (tareas = []) => {
  try {
    if (!Array.isArray(tareas)) {
      throw new Error("ERROR: Se esperaba un array");
    }
    // Serializar --> Convertir a String
    const json = JSON.stringify(tareas);
    // Guardar en el localStorage
    localStorage.setItem(TEXT_KEY, json);
    console.info("💾 Array guardado correctamente");
  } catch (error) {
    throw new Error("ERROR: " + error.message);
  }
};

export const addTarea = (nombreTarea) => {
  const nombre = String(nombreTarea ?? "").trim();
  try {
    const nuevaTarea = {
      id: uid(5),
      nombre,
      fechaCreacion: new Date().toISOString(),
      completada: false,
    };
    localStorage.setItem(TEXT_KEY, JSON.stringify(nuevaTarea));
  } catch {}
};

export const deleteTarea = (id) => {
  localStorage.removeItem();
};

/**
 * Función para devolver las tareas que han sido completadas
 * @author: Sergio Ramírez
 * @param {String} clave - Nombre de la clave que queremos
 * @return {Array} - Array de tareas que están completadas
 */
export const buscarCompletadas = (clave = "Tareas") => {
  if (!localStorage.getItem(clave)) {
    return [];
  }
  const arrayTareas = JSON.parse(localStorage.getItem(clave));
  return arrayTareas.filter((tarea) => tarea.completada);
};

function safeJSONParse(text) {
  try {
    if (typeof text !== "string") {
      throw new Error(`Error: ${text} no es un String`);
    }
    return JSON.parse(text);
  } catch (error) {
    throw new Error("Error al parsear JSON");
  }
}

export default mostrarTareas;
