// Objetos
const usuario = {
  name: "Sergio",
  email: "sergioramirezmoron@gmail.com",
  active: true,
};

// Para obtener las claves:
const claves = Object.keys(usuario); // [name, email, active]

// UTILIDAD verificar si las claves están todas siguiendo un objeto de partida
// 1. Como compruebo que todas las claves existen?
function validateRequiredValues(object, fields) {
  const clavesObjeto = Object.keys(object);

  return fields.every((field) =>
    clavesObjeto.some((c) => c.toLowerCase() === field.toLowerCase())
  );
}

//Data:
const datosFormulario = { name: "Carla", active: false };

const esValido = validateRequiredValues(datosFormulario, [
  "name",
  "password",
  "active",
]);

//console.log(esValido);

// Para los valores: values

const producto = {
  name: "laptop",
  stock: 100,
  precio: 1100,
  destacado: true,
};

// array de valores
const valores = Object.values(producto);
// ["laptop", 100, 1100, true]

//Verificar si algun valor cumple alguna condición:
const precipitaciones = {
  enero: 110,
  febrero: 98,
  marzo: 120,
  abril: 50,
};

// ¿Algún mes la precipitacion fue superior a 100 litros?

const mesSuperiorCien = Object.values(precipitaciones).some((precipitacion) => {
  return precipitacion > 100;
});

// Cuantos litros totales han caido en los meses enero-abril.
const allPrecipitations = Object.values(precipitaciones).reduce(
  (total, precipitation) => total + precipitation,
  0
);

//console.log(allPrecipitations);

// Calcular la precipitación máxima.
const maxPrecipitation = Object.values(precipitaciones).reduce(
  (max, precipitation) => (precipitation > max ? precipitation : max),
  0
);

const maxPrecipitation2 = Math.max(...Object.values(precipitaciones));

//console.log(maxPrecipitation);

// Obtener pares [clave valor] en forma de array. <---- entries()
const configuracion = {
  tema: "oscuro",
  idioma: "es",
  notificaciones: true,
  volumen: 75,
};

//Obtener array de pares clave,valor:
const entradas = Object.entries(configuracion);
/*
[
    ["tema", "oscuro"],
    ["idioma", "es"],
    ["notificaciones", true],
    ["volumen", 75],
]
*/

const usuarioBD = {
  name: "Sergio",
  email: "sergioramirezmoron@gmail.com",
  password: "asfg234sdf42",
  active: true,
};
// Filtrar. Eliminar los campos sensibles (password) de este object usuarioDB ("password").
//Object.entries(usuarioBD).filter([]);

// Destructuring
const { nombre, email } = usuarioBD;
// const nombre= usuarioBD.nombre
// const email= usuarioBD.email

const data = [1, 2, 3, 4, 5];
const { a, b, c } = data;
// a = 1
// b = 2
// c = 3

function vData(array) {
  const [v1, v2] = array;
  console.log("v1:", v1);
  console.log("v2:", v2);
}

// vData([1, 2, 3, 4, 5]);

// Crear funcion llamada mostrarPersona. Obtener el username, y las dos primeras redes sociales que el usuario tenga.

const usuario3 = {
  id: 1,
  info: {
    username: "Sergio",
    redes: ["twitter", "github", "linkedin"],
    edad: 77,
  },
};

const mostrarPersona = (user) => {
  const {
    info: {
      username,
      redes: [r1, r2],
    },
  } = usuario3;

  console.log(username, r1, r2);
};

// Obtener el nombre y la edad del siguiente objeto de JS. Si no existe edad, que guarde el valor 0
const data4 = {
  id: 101,
  usuario: {
    perfil: {
      nombre: "Lucía",
      edad: 28,
      direccion: {
        ciudad: "Granada",
        pais: "España",
      },
    },
    activo: true,
  },
};

const mostrarPersonaEdad = (data) => {
  const {
    usuario: {
      perfil: { nombre = "Anonimo", edad = 0 },
    },
  } = data;
  console.log("Nombre:", nombre);
  console.log("Edad:", edad);
};

console.log(mostrarPersonaEdad(data4));

const productos = [
  {
    id: 1,
    nombre: "Laptop",
    precio: 1000,
    fabricante: {
      nombre: "HP",
      pais: "USA",
      contacto: {
        email: "infoHp@gmail.com",
        telefono: "55443322",
      },
    },
    especificaciones: {
      ram: "16GB",
      cpu: "Intel i7",
    },
  },
  {
    id: 2,
    nombre: "Smartphone",
    precio: 800,
    fabricante: {
      nombre: "Samsung",
      pais: "Corea del Sur",
      contacto: {
        email: "support@samsung.com",
        telefono: "99887766",
      },
    },
    especificaciones: {
      ram: "8GB",
      cpu: "Exynos 2100",
    },
  },
  {
    id: 3,
    nombre: "Tablet",
    precio: 600,
    fabricante: {
      nombre: "Apple",
      pais: "USA",
      contacto: {
        email: "contact@apple.com",
        telefono: "11223344",
      },
    },
    especificaciones: {
      ram: "6GB",
      cpu: "Apple M1",
    },
  },
  {
    id: 4,
    nombre: "Monitor",
    precio: 300,
    fabricante: {
      nombre: "Dell",
      pais: "USA",
      contacto: {
        email: "support@dell.com",
        telefono: "44332211",
      },
    },
    especificaciones: {
      ram: "N/A",
      cpu: "N/A",
    },
  },
  {
    id: 5,
    nombre: "Impresora",
    precio: 200,
    fabricante: {
      nombre: "Canon",
      pais: "Japón",
      contacto: {
        email: "info@canon.jp",
        telefono: "55667788",
      },
    },
    especificaciones: {
      ram: "2GB",
      cpu: "ARM Cortex",
    },
  },
  {
    id: 6,
    nombre: "Smartwatch",
    precio: 250,
    fabricante: {
      nombre: "Xiaomi",
      pais: "China",
      contacto: {
        email: "service@xiaomi.com",
        telefono: "66778899",
      },
    },
    especificaciones: {
      ram: "1GB",
      cpu: "Snapdragon Wear 4100",
    },
  },
  {
    id: 7,
    nombre: "Auriculares",
    precio: 150,
    fabricante: {
      nombre: "Sony",
      pais: "Japón",
      contacto: {
        email: "support@sony.jp",
        telefono: "77889900",
      },
    },
    especificaciones: {
      ram: "N/A",
      cpu: "Bluetooth 5.2",
    },
  },
  {
    id: 8,
    nombre: "Cámara",
    precio: 1200,
    fabricante: {
      nombre: "Nikon",
      pais: "Japón",
      contacto: {
        email: "contact@nikon.com",
        telefono: "88990011",
      },
    },
    especificaciones: {
      ram: "4GB",
      cpu: "Expeed 6",
    },
  },
  {
    id: 9,
    nombre: "Consola",
    precio: 500,
    fabricante: {
      nombre: "Microsoft",
      pais: "USA",
      contacto: {
        email: "support@microsoft.com",
        telefono: "99001122",
      },
    },
    especificaciones: {
      ram: "16GB",
      cpu: "AMD Zen 2",
    },
  },
  {
    id: 10,
    nombre: "Router",
    precio: 100,
    fabricante: {
      nombre: "TP-Link",
      pais: "China",
      contacto: {
        email: "service@tp-link.com",
        telefono: "11002233",
      },
    },
    especificaciones: {
      ram: "512MB",
      cpu: "Dual-Core ARM",
    },
  },
];

// Crear una funcion que extraiga los datos del objeto y me devuelva la siguiente estructura.
// nombre, fabricante {nombre, contacto}, especificaciones{solo la ram}
// Imaginemos un array de productos
// USANDO LA NUEVA ESPECIFICACION obtener el nombre de los productos con más ram.

const extraerData = (products) => {
  const {
    nombre,
    fabricante: { nombre: nombreFabricante, contacto },
    especificaciones: { ram },
  } = products;

  return {
    nombre,
    fabricante,
    especificaciones
  };
};

// console.log(newData(productos));

const newDataArray = (arrayProducts) =>
  arrayProducts.map((product) => extraerData(product));

console.log(newDataArray(productos));
