const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.get('/:id', usuarioController.getClienteById);
router.put('/:id', usuarioController.updateCliente);

module.exports = router;
