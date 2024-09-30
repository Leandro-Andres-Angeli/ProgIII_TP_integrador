const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const oficinaController = require('../controllers/oficinaController');

router.get('/clientes', usuarioController.getClientes);

router.get('/empleados', usuarioController.getEmpleados);
router.get('/empleados/:id', usuarioController.getEmpleadoById);
router.post('/empleados', usuarioController.createEmpleado);
router.delete('/empleados/:id', usuarioController.deleteEmpleado);
router.put('/empleados/:id', usuarioController.updateEmpleado);

router.get('/oficinas', oficinaController.getOficinas);
router.get('/oficinas/:id', oficinaController.getOficinaById);
router.post('/oficinas', oficinaController.createOficina);
router.delete('/oficinas/:id', oficinaController.deleteOficina);
router.put('/oficinas/:id', oficinaController.updateOficina);

router.post(
  '/oficinas/:idOficina/empleados/:idEmpleado',
  oficinaController.asignarEmpleado
);
router.get('/oficinas/:id/empleados', oficinaController.getEmpleados);

module.exports = router;
