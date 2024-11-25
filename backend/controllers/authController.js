/*const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Registro de usuario
const register = (req, res) => {
  const { name, email, password } = req.body;

  // Verificar que todos los campos estén presentes
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Por favor ingresa todos los campos.' });
  }

  // Verificar si el correo ya está registrado
  User.findByEmail(email, (err, result) => {
    console.log('verificando correo:', email);
    if (err) {
      return res.status(500).json({ message: 'Error al verificar el correo.' });
    }
    if (result.length > 0) {
      return res.status(400).json({ message: 'El correo ya está registrado.' });
    }

    // Encriptar la contraseña
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) return res.status(500).json({ message: 'Error en el hash del password' });

      // Crear el usuario en la base de datos
      User.create(name, email, hashedPassword, (err, result) => {
        if (err) return res.status(500).json({ message: 'Error al registrar el usuario' });
        console.log('Usuario registrado exitosamente:', result); 
        res.status(201).json({ message: 'Usuario registrado exitosamente' });
      });
    });
  });
};

// Inicio de sesión
const login = (req, res) => {
  const { email, password } = req.body;

  // Verificar si se envían los datos
  if (!email || !password) {
    return res.status(400).json({ message: 'Por favor ingresa el correo y la contraseña.' });
  }

  // Buscar el usuario en la base de datos
  User.findByEmail(email, (err, result) => {
    if (err || !result || result.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Comparar la contraseña
    bcrypt.compare(password, result[0].password, (err, isMatch) => {
      if (err || !isMatch) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
      }

      // Generar un token JWT
      const token = jwt.sign({ id: result[0].id, email: result[0].email }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ message: 'Inicio de sesión exitoso', token });
    });
  });
};

module.exports = { register, login };*/

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Registro de usuario
const register = (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Por favor ingresa todos los campos.' });
  }

  User.findByEmail(email, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error al verificar el correo.' });
    }
    if (result.length > 0) {
      return res.status(400).json({ message: 'El correo ya está registrado.' });
    }

    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) return res.status(500).json({ message: 'Error en el hash del password' });

      User.create(name, email, hashedPassword, (err, result) => {
        if (err) return res.status(500).json({ message: 'Error al registrar el usuario' });
        res.status(201).json({ message: 'Usuario registrado exitosamente' });
      });
    });
  });
};

// Inicio de sesión
const login = (req, res) => {
console.log('Datos de login:', req.body);  // Agrega este log para ver qué datos está recibiendo  
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Por favor ingresa el correo y la contraseña.' });
  }

  User.findByEmail(email, (err, result) => {
    if (err || !result || result.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    bcrypt.compare(password, result[0].password, (err, isMatch) => {
      if (err || !isMatch) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
      }

      // Generar un token JWT
      const token = jwt.sign({ id: result[0].id, email: result[0].email }, process.env.JWT_SECRET, { expiresIn: '1h' });

      // Enviar datos del usuario junto con el token
      res.status(200).json({ 
        message: 'Inicio de sesión exitoso', 
        token,
        user: { id: result[0].id, name: result[0].name, email: result[0].email }
      });
    });
  });
};

module.exports = { register, login };

