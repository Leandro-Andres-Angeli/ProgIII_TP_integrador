const express = require('express');
const { validateUpdateUsuario } = require('../validations/usuarioValidator');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.get('/perfil', usuarioController.getPerfilCliente);

router.put('/perfil', [validateUpdateUsuario], usuarioController.updateCliente);

module.exports = router;
