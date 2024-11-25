const db = require('../db');

// Modelo de cita
const Appointment = {
  create: (userId, date, serviceType, callback) => {
    const query = 'INSERT INTO appointments (user_id, date, service_type) VALUES (?, ?, ?)';
    db.query(query, [userId, date, serviceType], callback);
  },
  getByUserId: (userId, callback) => {
    const query = 'SELECT * FROM appointments WHERE user_id = ?';
    db.query(query, [userId], callback);
  }
};

module.exports = Appointment;
