// Crear un sistema de categorias:
// Crear una variable llamada catalogo MAP que contenga dentro un set de productos.
// Crear las siguientes funciones:
// 1. Agregar producto, que devolvera true o false si el producto ha sido agregado.
// 2. Mostrar catalogo, que me muestre el catalogo.
// Adicionalmente, crear una función llamada buscarProducto, que le pase un string del nombre del producto y lo busque.
// Nota: Cuidado con el get que a veces devuelve undefined.
const catalogo = new Map<string, Set<string>>();

// funciones
const addProduct = (category: string, product: string): void => {
  if (!catalogo.has(category)) {
    catalogo.set(category, new Set<string>());
  }

  catalogo.get(category)?.add(product); // La interrogacion se pone si no es seguro de si existe o no existe
};

addProduct("Electrónica", "Portatil HP");
addProduct("Electrónica", "Portatil HP");
addProduct("Electrónica", "Ratón gaming");
addProduct("Cocina", "Tetera de hierro");
addProduct("Deportes", "Nike Air Force 1");

// mostrar catalogo de productos
const showCatalog = (): void => {
  console.log("---------------Catalogo de productos---------------");
  for (const [categoria, productos] of catalogo) {
    console.log(
      `✅ Categoría: ${categoria} -- Número de productos: ${productos.size}`
    );
    for (const producto of productos) {
      console.log(`🔘  ${producto}`);
    }
  }
};

showCatalog();

// Buscar un producto por nombre
const searchProduct = (nameProduct: string): string[] => {
  const foundCategories: string[] = [];
  for (const [categoria, productos] of catalogo) {
    if (productos.has(nameProduct)) {
      foundCategories.push(categoria);
    }
  }
  return foundCategories;
};

console.log(
  `Las categorias del producto Ratón gaming son: ${searchProduct(
    "Ratón gaming"
  )}` // ---> ["Electrónica"]
);
