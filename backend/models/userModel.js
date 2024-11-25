//const mysql = require('mysql2');
const db = require('../db');  // Asegúrate de que esta sea la conexión correcta a la base de datos

// Crear un nuevo usuario
const create = (name, email, password, callback) => {
  const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  db.query(query, [name, email, password], callback);
};

// Encontrar un usuario por su correo electrónico

const findByEmail = (email, callback) => {
  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) {
      console.log('Error al consultar el correo:', err);  // Agrega logs para depurar
      return callback(err);
    }
    console.log('Usuario encontrado:', results); // Verifica los resultados de la consulta
    callback(null, results);
  });
};
module.exports = { create, findByEmail };

