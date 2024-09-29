const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.get('/clientes', usuarioController.getClientes);

router.get('/empleados', usuarioController.getEmpleados);
router.get('/empleados/:id', usuarioController.getEmpleadoById);
router.post('/empleados', usuarioController.createEmpleado);
router.delete('/empleados/:id', usuarioController.deleteEmpleado);
router.put('/empleados/:id', usuarioController.updateEmpleado);

module.exports = router;
