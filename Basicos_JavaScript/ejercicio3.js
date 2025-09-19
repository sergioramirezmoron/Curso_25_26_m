// --------------------------- GESTION BANCARIA REVOLUT --------------------------
// El ejercicio consiste en llevar un pequeño sistema bancario en JavaScript que permita:
// - Crear una cuenta bancaria con un titular(String) y un saldo inicial(Number).
// - Permitir depositar dinero en la cuenta.
// - Permitir retirar dinero de la cuenta(siempre y cuando el saldo sea suficiente).
// - Mostrar el saldo actual de la cuenta.
// - Transferir dinero entre dos cuentas validando si tiene saldo para transferir.
// - Mantener un listado de cuentas y buscar cuentas por titular.

// Cuando creemos una cuenta se debe de generar un número de cuenta con una longitud del numero IBAN(24).
// Se deben documentar todas las funciones.
// Hacer un test con console.log de todas las funcionalidades. Creando una funcion test. Al final debe haber un test().

/**
 * Crea una cuenta bancaria con un titular y un saldo inicial.
 * @param {string} titular - El nombre del titular de la cuenta.
 * @param {number} saldoInicial - El saldo inicial de la cuenta.
 * @return {Object} - La cuenta bancaria creada.
 */
function crearCuenta(titular, saldoInicial) {
  const cuenta = {
    titular: titular,
    saldo: saldoInicial,
    numeroCuenta: generarNumeroCuenta(),
  };
  return cuenta;
}

/** Genera un número de cuenta bancaria con formato IBAN.
 * @return {string} - Un número de cuenta bancaria con formato IBAN.
 */
function generarNumeroCuenta() {
  let numeroCuenta = "ES";
  const caracteres = "0123456789";
  for (let i = 0; i < 22; i++) {
    numeroCuenta += caracteres.charAt(
      Math.floor(Math.random() * caracteres.length)
    );
  }
  return numeroCuenta;
}

/**
 * Deposita una cantidad de dinero en la cuenta.
 * @param {Object} cuenta - La cuenta bancaria.
 * @param {number} cantidad - La cantidad de dinero a depositar.
 */
function depositar(cuenta, cantidad) {
  if (cantidad > 0) {
    cuenta.saldo += cantidad;
    return true;
  }
  return false;
}

/**
 * Retira una cantidad de dinero de la cuenta si hay saldo suficiente.
 * @param {Object} cuenta - La cuenta bancaria.
 * @param {number} cantidad - La cantidad de dinero a retirar.
 */
function retirar(cuenta, cantidad) {
  if (cantidad <= cuenta.saldo && cantidad > 0) {
    cuenta.saldo -= cantidad;
    return true;
  }
  return false;
}

/** Muestra el saldo actual de la cuenta.
 * @param {Object} cuenta - La cuenta bancaria.
 * @return {number} - El saldo actual de la cuenta.
 */
function mostrarSaldo(cuenta) {
  return cuenta.saldo;
}

/**
 * Transfiere una cantidad de dinero de una cuenta a otra si la cuenta origen tiene saldo suficiente.
 * @param {Object} cuentaOrigen - La cuenta desde la que se transfiere el dinero.
 * @param {Object} cuentaDestino - La cuenta a la que se transfiere el dinero.
 * @param {number} cantidad - La cantidad de dinero a transferir.
 */
function transferir(cuentaOrigen, cuentaDestino, cantidad) {
  if (cantidad <= cuentaOrigen.saldo && cantidad > 0) {
    cuentaOrigen.saldo -= cantidad;
    cuentaDestino.saldo += cantidad;
    return true;
  }
  return false;
}

/** Busca una cuenta por su titular.
 * @param {Array} cuentas - El array de cuentas.
 * @param {string} titular - El titular a buscar.
 * @return {Object|null} - La cuenta encontrada o null si no se encuentra.
 */
function buscarCuentaPorTitular(cuentas, titular) {
  for (let i = 0; i < cuentas.length; i++) {
    if (cuentas[i].titular == titular) {
      return cuentas[i];
    }
  }
  return null;
}

/**
 * Realiza los tests correspondientes de la aplicación.
 * @return - Tests
 */
function test() {
  const cuentas = [];
  const cuenta1 = crearCuenta("Juan Perez", 1000);
  const cuenta2 = crearCuenta("Maria Lopez", 500);
  cuentas.push(cuenta1, cuenta2);
  console.log("Cuenta 1:", cuenta1);
  console.log("Cuenta 2:", cuenta2);
  console.log("Saldo cuenta 1:", mostrarSaldo(cuenta1));
  console.log("Saldo cuenta 2:", mostrarSaldo(cuenta2));
  depositar(cuenta1, 200);
  console.log(
    "Saldo cuenta 1 después de depositar 200:",
    mostrarSaldo(cuenta1)
  );
  retirar(cuenta2, 100);
  console.log("Saldo cuenta 2 después de retirar 100:", mostrarSaldo(cuenta2));
  transferir(cuenta1, cuenta2, 300);
  console.log(
    "Saldo cuenta 1 después de transferir 300 a cuenta 2:",
    mostrarSaldo(cuenta1)
  );
  console.log(
    "Saldo cuenta 2 después de recibir 300 de cuenta 1:",
    mostrarSaldo(cuenta2)
  );
  const cuentaBuscada = buscarCuentaPorTitular(cuentas, "Maria Lopez");
  console.log(cuentaBuscada);
  const cuentaBuscadaMal = buscarCuentaPorTitular(cuentas, "Jose");
  console.log(cuentaBuscadaMal, "Debe ser null");
}

// -------------------------- inicializar aplicación  --------------------------
test();
