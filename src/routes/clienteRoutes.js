const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.get('/perfil', usuarioController.getPerfilCliente);
router.put('/perfil', usuarioController.updateCliente);

module.exports = router;
