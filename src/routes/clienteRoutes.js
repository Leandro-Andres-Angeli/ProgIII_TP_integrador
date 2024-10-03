const express = require('express');
const { validateCliente} = require ('../validations/usuarioValidator');
const  validarCampos  = require ('../middleware/validarcampos.js');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.get('/perfil', usuarioController.getPerfilCliente);

router.put('/perfil', usuarioController.updateCliente);

router.post('/perfil',[
    validateCliente,
    validarCampos
], usuarioController.createCliente);

router.put('/perfil' , usuarioController.updateCliente);

router.delete('/perfil', usuarioController.deleteUsuario);


module.exports = router;
