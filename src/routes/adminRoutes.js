const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');
const empleadoController = require('../controllers/empleadoController');
const oficinaController = require('../controllers/oficinaController');
const {
  validateCreateUsuario,
  validateUpdateUsuario,
  validateUpdateContrasenia,
  validateUpdateCorreo,
} = require('../validations/usuarioValidator');
const tipoReclamoController = require('../controllers/tipoReclamoController');

router.get('/clientes', clienteController.getClientes);
router.get('/clientes/:id', clienteController.getClienteById);

router.get('/empleados', empleadoController.getEmpleados);
router.get('/empleados/:id', empleadoController.getEmpleadoById);
router.post(
  '/empleados',
  [validateCreateUsuario],
  empleadoController.createEmpleado
);
router.patch('/empleados/:id/delete', empleadoController.deleteEmpleado);
router.patch('/empleados/:id/reactivar', empleadoController.reactivarEmpleado);
router.patch(
  '/empleados/:id',
  [validateUpdateUsuario],
  empleadoController.updateEmpleado
);
router.patch(
  '/empleados/:id/correo',
  [validateUpdateCorreo],
  empleadoController.updateCorreoEmpleado
);
router.patch(
  '/empleados/:id/contrasenia',
  [validateUpdateContrasenia],
  empleadoController.updateContraseniaEmpleado
);

router.get('/oficinas', oficinaController.getOficinas);
router.get('/oficinas/:id', oficinaController.getOficinaById);
router.post('/oficinas', oficinaController.createOficina);
router.patch('/oficinas/:id/delete', oficinaController.deleteOficina);
router.patch('/oficinas/:id', oficinaController.updateOficina);

router.post('/oficinas/empleados', oficinaController.asignarEmpleados);
router.get('/oficinas/:id/empleados', oficinaController.getEmpleados);

router.post('/tipoReclamos', tipoReclamoController.createTipoReclamo);
router.patch(
  '/tipoReclamos/:id/delete',
  tipoReclamoController.deleteTipoReclamo
);
router.patch(
  '/tipoReclamos/:id/activar',
  tipoReclamoController.activarTipoReclamo
);
router.patch('/tipoReclamos/:id', tipoReclamoController.updateTipoReclamo);

router.get('/tipoReclamos/:id', tipoReclamoController.getTipoReclamoById);
router.get('/tipoReclamos', tipoReclamoController.getTipoReclamos);

module.exports = router;
