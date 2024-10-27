const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const oficinaController = require('../controllers/oficinaController');
const estadisticasController = require('../controllers/estadisticasController');
const {
  validateCreateUsuario,
  validateUpdateUsuario,
} = require('../validations/usuarioValidator');

router.get('/clientes', usuarioController.getClientes);
router.get('/clientes/:id', usuarioController.getClienteById);

router.get('/empleados', usuarioController.getEmpleados);
router.get('/empleados/:id', usuarioController.getEmpleadoById);
router.post(
  '/empleados',
  [validateCreateUsuario],
  usuarioController.createEmpleado
);
router.patch('/empleados/:id', usuarioController.deleteEmpleado);
router.put(
  '/empleados/:id',
  [validateUpdateUsuario],
  usuarioController.updateEmpleado
);

router.get('/oficinas', oficinaController.getOficinas);
router.get('/oficinas/:id', oficinaController.getOficinaById);
router.post('/oficinas', oficinaController.createOficina);
router.patch('/oficinas/:id/delete', oficinaController.deleteOficina);
router.patch('/oficinas/:id', oficinaController.updateOficina);

router.post('/oficinas/empleados', oficinaController.asignarEmpleados);
router.get('/oficinas/:id/empleados', oficinaController.getEmpleados);

router.get(
  '/estadisticas/totalesReclamosEstados',
  estadisticasController.getTotalesReclamosEstados
);

module.exports = router;
