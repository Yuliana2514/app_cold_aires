const express = require('express');
const { createAppointment, getAppointments } = require('../controllers/appointmentController');
const router = express.Router();

router.post('/appointments', createAppointment);
router.get('/appointments/:userId', getAppointments);

module.exports = router;
