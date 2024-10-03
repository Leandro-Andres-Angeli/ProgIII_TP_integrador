const express = require('express');
const { validateUsuario} = require ('../validations/usuarioValidator');
const { validarCampos } = require ('../middlewares/validarcampos.js');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.get('/usuarios', usuarioController.getUsuarios);

router.get('/usuarios/:id', usuarioController.getUsuarioById);

router.post('/usuarios',[
    validateUsuario,
    validarCampos
], usuarioController.createUsuario);

router.put('/usuarios/:id', usuarioController.updateUsuario);

router.delete('/usuarios/:id', usuarioController.deleteUsuario);

module.exports = router;
