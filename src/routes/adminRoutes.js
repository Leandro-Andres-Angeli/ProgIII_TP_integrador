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
const upload = require('../config/multerConfig');
const tipoReclamoController = require('../controllers/tipoReclamoController');
const adminController = require('../controllers/adminController');

// CLIENTES

router.get('/clientes', clienteController.getClientes);
router.get('/clientes/:id', clienteController.getClienteById);
router.get('/clientes/:id/imagen', clienteController.getImagenClienteById);

// EMPLEADOS

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
  empleadoController.updateEmpleadoById
);
router.patch(
  '/empleados/:id/correo',
  [validateUpdateCorreo],
  empleadoController.updateCorreoEmpleadoById
);
router.patch(
  '/empleados/:id/contrasenia',
  [validateUpdateContrasenia],
  empleadoController.updateContraseniaEmpleadoById
);
router.get('/empleados/:id/imagen', empleadoController.getImagenEmpleadoById);
router.patch(
  '/empleados/:id/imagen',
  upload.single('imagenPerfil'),
  empleadoController.updateImagenEmpleadoById
);
router.patch(
  '/empleados/:id/imagen/borrar',
  empleadoController.deleteImagenEmpleadoById
);

// OFICINAS

router.get('/oficinas', oficinaController.getOficinas);
router.get('/oficinas/:id', oficinaController.getOficinaById);
router.post('/oficinas', oficinaController.createOficina);
router.patch('/oficinas/:id/delete', oficinaController.deleteOficina);
router.patch('/oficinas/:id/reactivar', oficinaController.reactivarOficina);
router.patch('/oficinas/:id', oficinaController.updateOficina);

// OFICINA-EMPLEADOS

router.post('/oficinas/empleados/asignar', oficinaController.asignarEmpleados);
router.post(
  '/oficinas/empleados/desvincular',
  oficinaController.desvincularEmpleados
);
router.get('/oficinas/:id/empleados', oficinaController.getEmpleados);

// TIPO RECLAMOS

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

// ADMIN
router.get('/perfil', adminController.getPerfilAdmin);
router.patch('/perfil', [validateUpdateUsuario], adminController.updateAdmin);
router.get('/perfil/imagen', adminController.getImagenAdmin);
router.patch(
  '/perfil/imagen',
  upload.single('imagenPerfil'),
  adminController.updateImagenAdmin
);
router.patch('/perfil/imagen/borrar', adminController.deleteImagenAdmin);
router.patch(
  '/perfil/correo',
  [validateUpdateCorreo],
  adminController.updateCorreoAdmin
);
router.patch(
  '/perfil/contrasenia',
  [validateUpdateContrasenia],
  adminController.updateContraseniaAdmin
);
module.exports = router;
