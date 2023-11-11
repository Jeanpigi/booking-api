const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "reservas.db");

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("Base de datos conectada");

    db.run(
      ` CREATE TABLE IF NOT EXISTS rol (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre_rol text,
            )`,
      (err) => {
        if (err) {
          console.log("Table 'rol' already exists");
        } else {
          console.log("Table 'rol' created");
        }
      }
    );

    // Crear tabla de usuario
    db.run(
      `
      CREATE TABLE IF NOT EXISTS user (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT UNIQUE,
        password TEXT,
        CONSTRAINT email_unique UNIQUE (email),
        FOREIGN KEY (rol_id) REFERENCES rol(id)
      );`,
      (err) => {
        if (err) {
          console.log("Table 'user' already exists");
        } else {
          console.log("Table 'user' created");
        }
      }
    );

    // Crear tabla de recurso
    db.run(
      `
      CREATE TABLE IF NOT EXISTS recurso (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        descripcion TEXT,
        ubicacion TEXT,
        capacidad INTEGER,
        disponibilidad BOOLEAN DEFAULT 1
      );`,
      (err) => {
        if (err) {
          console.log("Table 'recurso' already exists");
        } else {
          console.log("Table 'recurso' created");
        }
      }
    );

    // Crear tabla de reserva
    db.run(
      `
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
      (err) => {
        if (err) {
          console.log("Table 'reserva' already exists");
        } else {
          console.log("Table 'reserva' created");
        }
      }
    );
  }
});

module.exports = {
  db,
};
