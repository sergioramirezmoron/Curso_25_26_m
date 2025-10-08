/**
 * @param {Object} products Objeto newData
 * @return {Object} Objeto con información extraida
 */
export const extraerData = (products) => {
  const {
    nombre,
    fabricante: { nombre: nombreFabricante, contacto },
    especificaciones: { ram },
  } = products;

  return {
    nombre,
    nombreFabricante,
    contacto,
    ram,
  };
};

// Funcion que le pases un array de objetos y te diga el nombre del producto que producto tiene mayor cantidad de ram. Llamada maxRam.

export const maxRam = (arrayProducts) => {
  const productoMaxRam = arrayProducts.reduce((max, actual) => {
    return actual.especificaciones.ram > max.especificaciones.ram ? actual : max;
  });
  return productoMaxRam.nombre;
};
