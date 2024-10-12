const express = require('express');
const router = express.Router();
const oficinaController = require('../../controllers/oficinaController');

router.post('/oficinas/empleados', oficinaController.asignarEmpleados);
router.delete('/oficinas/:id', oficinaController.deleteOficina_v2);

module.exports = router;
