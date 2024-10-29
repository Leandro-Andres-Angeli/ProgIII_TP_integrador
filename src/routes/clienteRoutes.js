const express = require('express');
const {
  validateUpdateUsuario,
  validateUpdateCorreo,
  validateUpdateContrasenia,
} = require('../validations/usuarioValidator');
const router = express.Router();
const clienteController = require('../controllers/clienteController');
const tipoReclamoController = require('../controllers/tipoReclamoController');

router.get('/perfil', clienteController.getPerfilCliente);

router.patch(
  '/perfil',
  [validateUpdateUsuario],
  clienteController.updateCliente
);

router.patch(
  '/perfil/correo',
  [validateUpdateCorreo],
  clienteController.updateCorreoCliente
);

router.patch(
  '/perfil/contrasenia',
  [validateUpdateContrasenia],
  clienteController.updateContraseniaCliente
);

router.get('/tipoReclamos', tipoReclamoController.getTipoReclamosActivos);

module.exports = router;
