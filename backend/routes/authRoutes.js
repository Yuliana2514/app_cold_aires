const express = require('express');
const { register, login } = require('../controllers/authController');
const router = express.Router();

//Ruta de registrar usuario
router.post('/register', register);

//Ruta de inicio de sesión
router.post('/login', login);

module.exports = router;
