import db from "./helpers/db";

const app = () => {
  // Primera función Closure
  /*   const crearClosure = () => {
    let mensajeSecreto = "Yo soy tu closure";

    return () => {
      console.log("Mensaje: ", mensajeSecreto);
    };
  };

  const miClosure = crearClosure();
  miClosure();
  console.log("-------------------------------------");
  // --------------- SCOPE LEXICO  ---------------

  let nivelGlobal = "Soy Global 🌍";

  const funcionExterna = () => {
    let nivelExterno = "Soy del scope externo";
    const funcionInterna = () => {
      let nivelInterno = "Soy del scope interno";

      // Demostremos...
      console.log("Accediendo a: ", nivelGlobal);
      console.log("Accediendo a: ", nivelExterno);
      console.log("Accediendo a: ", nivelInterno);
    };
    funcionInterna();
  };
  funcionExterna();

  console.log("-------------------------------------"); */
  // EJERCICIO ENCAPSULACION
  // Crear un objeto público objetoPublico que tenga las claves saldo y retirar dinero que será una función.
  // Al método retirarDinero se le tiene que pasar una cantidad y retirar esa cantidad del saldo.
  /*  const objetoPublico = {
    saldo: 1000,
    retirarDinero: function (cantidad) {
      this.saldo -= cantidad;
    },
  };

  objetoPublico.retirarDinero(100);
  console.log("Saldo: ", objetoPublico.saldo); */
  // Esta mal porque podriamos cambiar la cantidad de dinero a nuestro gusto
  /* objetoPublico.retirarDinero(100000);
  console.log("Saldo: ", objetoPublico.saldo); */
  /* // Bien hecho
  const crearCuentaBancaria = (saldoInicial = 0) => {
    // Saldo tiene que ser private
    let saldo = saldoInicial;

    return {
      obtenerSaldo: () => saldo,
      depositar: (cantidad = 0) => {
        if (cantidad > 0) {
          saldo += cantidad;
          console.log(
            `✅ Cantidad ${cantidad}€ añadida. El nuevo saldo es: ${saldo}`
          );
        }
        return true;
      },
      retirar: (cantidad = 0) => {
        if (cantidad < 0 && cantidad > saldo) {
          console.log("Error, cantidad incorrecta o saldo insuficiente");
          return false;
        }
        saldo -= cantidad;
        console.log(
          `✅ Cantidad ${cantidad}€ retirado. El nuevo saldo es: ${saldo}`
        );
        return true;
      },
    };
  };
  // Primera cuenta
  const miCuenta1 = crearCuentaBancaria(1000);
  //miCuenta1.saldo = 99999; Nos va a crear otra clave saldo con valor 99999
  miCuenta1.depositar(100);
  miCuenta1.retirar(50);

  const miCuenta2 = crearCuentaBancaria(100);
  console.log("Saldo de miCuenta2", miCuenta2.obtenerSaldo());
  miCuenta2.saldo = 9999999;
  console.log("Saldo de miCuenta2", miCuenta2.obtenerSaldo()); */
  // EJERCICIO
  // Crear un contador que puede incrementar, decrementar, resetear y obtener le valor del contador
  // Se pide:
  // 1. Crear dos contadores. Uno que empiece en 10, y vaya hasta el 0, y otro que empiece en 0 y vaya hasta el 10.
  // Mostrar o ejemplificar utilizando un temporizador de un segundo como uno sube y otro baja, utilizando los métodos del contador.
  // Recomendado usar setInterval(funcion, tiempo en ms)
  /*   const crearContador = (inicio = 0) => {
    let contador = inicio;

    return {
      incrementar: (cantidad = 1) => {
        contador += cantidad;
        return contador;
      },
      decrementar: (cantidad = 1) => {
        contador -= cantidad;
        return contador;
      },
      resetear: () => {
        contador = inicio;
        return contador;
      },
      obtenerValor: () => contador,
    };
  };

  const miContador1 = crearContador(0);
  const miContador2 = crearContador(10);

  const intervalo = setInterval(() => {
    if (miContador1.incrementar() <= 10) {
      console.log(miContador1.obtenerValor());
      if (miContador1.obtenerValor() === 10) {
        clearInterval(intervalo);
      }
    }
  }, 1000); */

  // EJERCICIO
  // Ejemplificar un carrito de la compra persistente utilizando closure y
  // estableciendo la persistencia a través de una base de datos SQLite3
  // Ejemplificar un carrito de la compra que permita insertar productos,
  // insertar cantidad de productos, eliminar productos y calcular total del
  // carrito usando SQLite3.

  const database = db;
  const crearCarrito = () => {
    const insertarProducto = (idProducto, cantidad = 1) => {
      if (!idProducto || cantidad <= 0) {
        console.error("Datos no válidos para insertar");
        return;
      }

      database.get(
        "SELECT cantidad FROM carrito WHERE idProducto = ?",
        [idProducto],
        (err, row) => {
          if (err) {
            console.error("Error al buscar producto", err);
            return;
          }

          if (row) {
            database.run(
              "UPDATE carrito SET cantidad = ? WHERE idProducto = ?",
              [row.cantidad + cantidad, idProducto],
              (updateErr) => {
                if (updateErr) {
                  console.error("Error al actualizar cantidad", updateErr);
                  return;
                }
                console.log("Cantidad actualizada");
              }
            );
          } else {
            database.run(
              "INSERT INTO carrito (idProducto, cantidad) VALUES (?, ?)",
              [idProducto, cantidad],
              (insertErr) => {
                if (insertErr) {
                  console.error("Error al insertar producto", insertErr);
                  return;
                }
                console.log("Producto añadido");
              }
            );
          }
        }
      );
    };

    const eliminarProducto = (idProducto) => {
      database.run(
        "DELETE FROM carrito WHERE idProducto = ?",
        [idProducto],
        function (err) {
          if (err) {
            console.error("Error al eliminar producto", err);
            return;
          }
          if (this.changes === 0) {
            console.log("Producto no encontrado");
            return;
          }
          console.log("Producto eliminado");
        }
      );
    };

    const totalCarrito = () => {
      database.get(
        `
        SELECT IFNULL(SUM(p.price * c.cantidad), 0) AS total
        FROM carrito c
        INNER JOIN productos p ON p.id = c.idProducto
      `,
        (err, row) => {
          if (err) {
            console.error("Error al calcular total", err);
            return;
          }
          console.log(`Total del carrito: ${row.total}€`);
        }
      );
    };

    return {
      insertarProducto,
      eliminarProducto,
      totalCarrito,
    };
  };

  const carrito1 = crearCarrito();
  carrito1.insertarProducto(1);
  carrito1.insertarProducto(1, 2);
  carrito1.totalCarrito();
};

export default app;
