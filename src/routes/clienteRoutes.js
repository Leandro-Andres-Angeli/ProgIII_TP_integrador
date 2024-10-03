const express = require('express');
const { validateCliente} = require ('../validations/usuarioValidator');
const { validarCampos } = require ('../middlewares/validarCampos.js');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.get('/perfil', usuarioController.getPerfilCliente);

router.put('/perfil', usuarioController.updateCliente);

router.post('/clientes',[
    validateCliente,
    validarCampos
], usuarioController.createCliente);

router.put('/perfil' , usuarioController.updateCliente);

router.delete('/perfil', usuarioController.deleteUsuario);


module.exports = router;
