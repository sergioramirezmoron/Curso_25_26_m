// Primitivos en TypeScript
let nombre: string = "Sergio";
let cp: number = 20303;
let mensaje: string = `Hola, ${nombre}. Tu código postal es ${cp}.`;

function procesarTexto(texto: string): string {
  return texto.trim().toUpperCase();
}

//console.log(procesarTexto(mensaje));
let saludo = "¿Qué tal todo?"; // Declaración con inferencia de tipo
procesarTexto(saludo);

// 2. number
// Crear function que se llame calcularPrecioFinal(precio, impuesto, descuento);
function calcularPrecioFinal(
  precio: number,
  impuesto: number,
  descuento: number
): number {
  return precio * (1 + impuesto / 100) * (1 - descuento / 100); // 21%, 3% ->
}

// Cualquier tipo "any" (Siempre que se pueda no usar)
// Funcion que verifique que lo que pase como parámetro es un número
// No es infinito, !isNan

function esNumero(numero: any): boolean {
  if (typeof numero === "number" && !isNaN(numero) && isFinite(numero)) {
    return true;
  }
  return false;
}

// calcular el promedio de los elementros de un array de números
function sumarArray(numeros: number[]): number {
  if (numeros.length === 0) {
    throw new Error("El array no puede estar vacío");
  }
  const total: number = numeros.reduce((acc, numero) => acc + numero, 0);
  return total / numeros.length;
}

// Calcular max y min
function calcularExtremos(numeros: number[]): { max: number; min: number } {
  if (numeros.length === 0) {
    throw new Error("El array no puede estar vacío");
  }
  const max: number = Math.max(...numeros);
  const min: number = Math.min(...numeros);
  return { max, min };
}

// 3. Booleanos

// Comprobar si un email es correcto o no
function esValidoEmail(email: string): boolean {
  //sergioramirezmoron@gmail.com
  // El . y el espacio(\s) no pueden estar, hay que escaparlos (\)
  const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Interface -> Tipo de dato generado por el usuario para una determinada situacion (se separan por comas, pero el prettier las pone como ;)
interface permisosUsuario {
  puedeLeer: boolean;
  puedeEscribir: boolean;
  puedeBorrar: boolean;
}

// Crear un tipo de dato entre unos valores dados
type tipoUsuario = "admin" | "usuario" | "invitado";

// Crear una funcion llamada obtenerPermisos que dependiendo de si el usuario es admin, invitado o usuario, cambie los permisos de la interfaz.

function obtenerPermisos(usuario: tipoUsuario): permisosUsuario {
  switch (usuario) {
    case "admin":
      return { puedeLeer: true, puedeEscribir: true, puedeBorrar: true };
    case "usuario":
      return { puedeLeer: true, puedeEscribir: true, puedeBorrar: false };
    case "invitado":
      return { puedeLeer: true, puedeEscribir: false, puedeBorrar: false };
    default:
      return { puedeLeer: false, puedeEscribir: false, puedeBorrar: false };
  }
}

// NULL y UNDEFINED
let posibleNombre: string | null = "Invitado"; // Valor string o si es null, por defecto es Invitado
let posibleNombreIndefinido: string | undefined = undefined; // Valor string o si es undefined, por defecto es Invitado

// Arrow function
const duplicar = (numero: number): number => {
  return numero * 2;
};

// Crear una funcion que le pase como parametro un array de objetos y me devuelva los usuarios mayores de edad.
const usuarios = [
  { nombre: "Ana", edad: 34 },
  { nombre: "Sara", edad: 14 },
  { nombre: "Mario", edad: 24 },
  { nombre: "Carlos", edad: 18 },
];

const mayoresEdad = (
  usuarios: { nombre: string; edad: number }[]
): { nombre: string }[] => {
  return usuarios
    .filter((usuario) => usuario.edad >= 18)
    .map((usuario) => ({ nombre: usuario.nombre }));
};

const misNumeros: number[] = [1, -3, 4, 54, 2, 4, 9, -23, 64, 12, -76, 32];

// funcion procesarNumeros que cree devuelva un array de numeros solo positivos, multiplicados por 2 y ordenados de menor a mayor.
const procesarNumeros = (numeros: number[]): number[] => {
  return numeros
    .filter((numero: number) => numero > 0)
    .map((numero: number) => numero * 2)
    .sort((a: number, b: number) => a - b);
};

// Ejercicio 2
interface Cliente {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
}

export const listaClientes: Cliente[] = [
  {
    id: 1,
    nombre: "Carlos Pérez",
    email: "carlos.perez@example.com",
    telefono: "+34 612 345 678",
  },
  {
    id: 2,
    nombre: "María López",
    email: "maria.lopez@example.com",
    telefono: "+34 689 123 456",
  },
  {
    id: 3,
    nombre: "Javier Gómez",
    email: "javier.gomez@example.com",
    telefono: "+34 611 789 234",
  },
  {
    id: 4,
    nombre: "Laura Sánchez",
    email: "laura.sanchez@example.com",
    telefono: "+34 670 890 321",
  },
  {
    id: 5,
    nombre: "Andrés Torres",
    email: "andres.torres@example.com",
    telefono: "+34 698 555 112",
  },
  {
    id: 6,
    nombre: "Elena Rodríguez",
    email: "elena.rodriguez@example.com",
    telefono: "+34 622 987 456",
  },
  {
    id: 7,
    nombre: "Ricardo Fernández",
    email: "ricardo.fernandez@example.com",
    telefono: "+34 633 321 789",
  },
  {
    id: 8,
    nombre: "Patricia Morales",
    email: "patricia.morales@example.com",
    telefono: "+34 644 678 234",
  },
  {
    id: 9,
    nombre: "Sergio Navarro",
    email: "sergio.navarro@example.com",
    telefono: "+34 655 890 123",
  },
  {
    id: 10,
    nombre: "Lucía Domínguez",
    email: "lucia.dominguez@example.com",
    telefono: "+34 666 111 999",
  },
];

// Crear una funcion que genere un MAP con la siguiente estructura
//{
// idUsuario : {
// nombre: string,
// email: string,
// telefono: string,
//  }
//}

export const generarMapaClientes = (
  arrayUsuarios: Cliente[]
): Map<number, { nombre: string; email: string; telefono: string }> => {
  const mapClientes = new Map();
  arrayUsuarios.forEach((usuario) => {
    mapClientes.set(`IdUsuario: ${usuario.id}`, {
      nombre: usuario.nombre,
      email: usuario.email,
      telefono: usuario.telefono,
    });
  });
  return mapClientes;
};

// Calculadora Simple. Crear una calculadora tipada que realice operaciones basicas. Para ello, partimos de una interfaz llamada operacion, formada por tipo, con 4 posibles opciones, sumar, restar, multiplicar o dividir. Segundo elemento, operando 1 y Tercer elemento operando 2.
// Crear funcion llamada calculadora(operacion) de tipo operacion y me devolvera segun el tipo el calculo de los dos operandos. Probarlo con 10 5 y 10 0.
// ¿Se podría ampliar a otras operaciones?
export type operaciones = "suma" | "resta" | "multiplicacion" | "division";

export interface Operacion {
  tipo: operaciones;
  operando1: number;
  operando2: number;
}

export const calculadora = (operacion: Operacion): number => {
  switch (operacion.tipo) {
    case "suma":
      return operacion.operando1 + operacion.operando2;
    case "resta":
      return operacion.operando1 - operacion.operando2;
    case "multiplicacion":
      return operacion.operando1 * operacion.operando2;
    case "division":
      if (operacion.operando2 === 0) {
        throw new Error("No se puede dividir por 0");
      }
      return operacion.operando1 / operacion.operando2;

    default:
      throw new Error("No es una operacion válida");
  }
};

export const testCalculadora = (): void => {
  console.log(calculadora({ tipo: "suma", operando1: 10, operando2: 5 }));
  console.log(calculadora({ tipo: "resta", operando1: 10, operando2: 5 }));
  console.log(calculadora({ tipo: "multiplicacion", operando1: 10, operando2: 5 }));
  console.log(calculadora({ tipo: "division", operando1: 10, operando2: 5 }));
  console.log(calculadora({ tipo: "suma", operando1: 10, operando2: 0 }));
  console.log(calculadora({ tipo: "resta", operando1: 10, operando2: 0 }));
  console.log(calculadora({ tipo: "multiplicacion", operando1: 10, operando2: 0 }));
  console.log(calculadora({ tipo: "division", operando1: 10, operando2: 0 }));
};
