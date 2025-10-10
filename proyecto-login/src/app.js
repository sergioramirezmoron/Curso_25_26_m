// app.js
import {
  registrarUsuario as registrarArray,
  loginUsuario as loginArray,
  cambiarPassword as cambiarArray,
} from "./helpers/arrayHandler.js";

import {
  registrarUsuario as registrarObject,
  loginUsuario as loginObject,
  cambiarPassword as cambiarObject,
} from "./helpers/objectHandler.js";

import {
  registrarUsuario as registrarMap,
  loginUsuario as loginMap,
  cambiarPassword as cambiarMap,
} from "./helpers/mapHandler.js";

const registrarUsuario = (username, password, tipo) => {
  switch (tipo.toLowerCase()) {
    case "array":
      registrarArray(username, password, tipo);
      break;
    case "object":
      registrarObject(username, password, tipo);
      break;
    case "map":
      registrarMap(username, password, tipo);
      break;
    default:
      console.error("❌ Invalid type");
  }
};

const loginUsuario = (username, password, tipo) => {
  switch (tipo.toLowerCase()) {
    case "array":
      loginArray(username, password, tipo);
      break;
    case "object":
      loginObject(username, password, tipo);
      break;
    case "map":
      loginMap(username, password, tipo);
      break;
    default:
      console.error("❌ Invalid type");
  }
};

const cambiarPassword = (username, passwordActual, passwordNueva, tipo) => {
  switch (tipo.toLowerCase()) {
    case "array":
      cambiarArray(username, passwordActual, passwordNueva, tipo);
      break;
    case "object":
      cambiarObject(username, passwordActual, passwordNueva, tipo);
      break;
    case "map":
      cambiarMap(username, passwordActual, passwordNueva, tipo);
      break;
    default:
      console.error("❌ Invalid type");
  }
};

try {
  registrarUsuario("isaías", "1234", "array");

  loginUsuario("isaías", "1234", "array");

  cambiarPassword("isaías", "1234", "abcd123", "array");

  loginUsuario("isaías", "abcd123", "array");
} catch (err) {
  console.error(err.message);
}
