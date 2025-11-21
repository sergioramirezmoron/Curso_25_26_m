import sqlite3 from "sqlite3";

const db = new sqlite3.Database("db/carrito.db");

// Ejecutar una vez al inicio: crea tablas si no existen
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS productos (
      id INT(11) PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price DOUBLE(7,2) NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS carrito (
      id INT(11) PRIMARY KEY AUTOINCREMENT,
      idProducto INT(11) NOT NULL,
      cantidad INT(10) NOT NULL,
      FOREIGN KEY (idProducto) REFERENCES productos(id)
    )
  `);
});

export default db;
