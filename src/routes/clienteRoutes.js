const express = require('express');
const { validateCliente} = require ('../validations/usuarioValidator');
const  {validarCampos}  = require ('../middleware/validarcampos');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.get('/perfil', usuarioController.getPerfilCliente);

router.put('/perfil/',[
    validateCliente,
    validarCampos
], usuarioController.updateCliente);

router.post('/perfil',[
    validateCliente,
    validarCampos
], usuarioController.createCliente);

module.exports = router;
