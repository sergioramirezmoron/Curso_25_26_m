import { ENV } from "../config/env";

// Crear una función llamada initialStorage que reciba un array de usuarios y los guarde en el localStorage.
/**
 *
 * @param {*} arrayUsers - Array de usuarios
 */
export const initialStorage = (arrayUsers) => {
  localStorage.setItem(ENV.VITE_STORAGE_KEY, JSON.stringify(arrayUsers));
  console.log(`${ENV.VITE_APP_TITLE}: Usuarios guardados correctamente`);
};

// Crear una funcion llamada getUsuarios que se traiga todos los usuarios
/**
 *
 * @return
 */
export const getUsers = () => {
  return JSON.parse(localStorage.getItem(ENV.VITE_STORAGE_KEY)) || [];
};

// Crear una función llamada setUsuarios que le pases como parametro un usuario y lo guarde en el localStorage en la key del .env
/**
 *
 * @param {*} user - Usuario
 */
export const setUsers = (user) => {
  initialStorage([...getUsers(), user]);
};
