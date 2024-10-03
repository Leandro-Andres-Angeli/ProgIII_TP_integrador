const express = require('express');
const { validateUsuario} = require ('../validations/usuarioValidator');
const { validarCampos } = require ('../middlewares/validarCampos.js');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.get('/perfil', usuarioController.getPerfilCliente);

router.put('/perfil', usuarioController.updateCliente);

router.post('/perfil',[
    validateUsuario,
    validarCampos
], usuarioController.createUsuario);

router.put('/perfil' , usuarioController.updateUsuario);

router.delete('/perfil', usuarioController.deleteUsuario);


module.exports = router;
