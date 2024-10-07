const express = require('express');
const { validateCliente } = require('../validations/usuarioValidator');
const { validarCampos } = require('../middleware/validarcampos');
const { validLogin } = require('../validations/validLogin');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const authController = require('../controllers/authController');
const { handleTokenValidity } = require('../controllers/auth');
const { isClient } = require('../middleware/authorization');
router.post(
  '/perfil',
  [validateCliente, validarCampos],
  usuarioController.createCliente
);
router.use(handleTokenValidity, isClient);
router.get('/perfil', usuarioController.getPerfilCliente);

router.put(
  '/perfil',
  [validateCliente, validarCampos],
  usuarioController.updateCliente
);

router.post('/login', [validLogin, validarCampos], authController.login);
module.exports = router;
