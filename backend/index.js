const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const { login } = require('./controllers/authController');


dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Cambia si usas otro usuario
  password: 'root', // Cambia si tienes contraseña
  database: 'cold_airesapp'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    console.log('Connected to MySQL database.');
  }
});

// Ruta de ejemplo
app.get('/', (req, res) => {
  res.send('API funcionando');
});

// Rutas
app.use('/api', authRoutes);
app.use('/api', appointmentRoutes);
//app use login 


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
