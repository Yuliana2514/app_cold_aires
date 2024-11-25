const Appointment = require('../models/appointmentModel');

// Crear una cita
const createAppointment = (req, res) => {
  const { userId, date, serviceType } = req.body;
  Appointment.create(userId, date, serviceType, (err, result) => {
    if (err) return res.status(500).json({ message: 'Error al crear la cita' });
    res.status(201).json({ message: 'Cita creada exitosamente' });
  });
};

// Obtener las citas de un usuario
const getAppointments = (req, res) => {
  const { userId } = req.params;
  Appointment.getByUserId(userId, (err, result) => {
    if (err) return res.status(500).json({ message: 'Error al obtener las citas' });
    res.status(200).json(result);
  });
};

module.exports = { createAppointment, getAppointments };
