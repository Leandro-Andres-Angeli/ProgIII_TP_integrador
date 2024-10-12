const express = require('express');
const router = express.Router();
const oficinaController = require('../../controllers/oficinaController');

router.post('/oficinas/empleados', oficinaController.asignarEmpleados);

module.exports = router;
