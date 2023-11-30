const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "reservas.db");

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("Base de datos conectada");

    // Define un arreglo de definiciones de tabla
    const tableDefinitions = [
      {
        tableName: "rol",
        sql: `
          CREATE TABLE IF NOT EXISTS rol (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre_rol TEXT
          );`,
      },
      {
        tableName: "user",
        sql: `
          CREATE TABLE IF NOT EXISTS user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre_usuario TEXT,
            email TEXT UNIQUE,
            password TEXT,
            FOREIGN KEY (rol_id) REFERENCES rol(id)
          );`,
      },
      {
        tableName: "recurso",
        sql: `
          CREATE TABLE IF NOT EXISTS recurso (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            descripcion TEXT,
            ubicacion TEXT,
            capacidad INTEGER,
            disponibilidad BOOLEAN DEFAULT 1
          );`,
      },
      {
        tableName: "reserva",
        sql: `
          CREATE TABLE IF NOT EXISTS reserva (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            fecha_reserva DATE NOT NULL,
            hora_inicio TIME NOT NULL,
            hora_fin TIME NOT NULL,
            usuario_id INTEGER NOT NULL,
            recurso_id INTEGER NOT NULL,
            CONSTRAINT fk_usuario FOREIGN KEY (usuario_id) REFERENCES user(id),
            CONSTRAINT fk_recurso FOREIGN KEY (recurso_id) REFERENCES recurso(id)
          );`,
      },
    ];

    // Itera sobre la matriz de definiciones de tabla y crea las tablas
    tableDefinitions.forEach((tableDef) => {
      db.run(tableDef.sql, (err) => {
        if (err) {
          console.log(`Table '${tableDef.tableName}' already exists`);
        } else {
          console.log(`Table '${tableDef.tableName}' created`);
        }
      });
    });
  }
});

module.exports = {
  db,
};
