const express = require('express');
const {
  validateUpdateUsuario,
  validateUpdateCorreo,
  validateUpdateContrasenia,
} = require('../validations/usuarioValidator');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

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

module.exports = router;
