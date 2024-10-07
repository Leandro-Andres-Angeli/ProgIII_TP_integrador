const express = require('express');
const { validateCliente} = require('../validations/usuarioValidator');
const  {validarCampos}  = require('../middleware/validarcampos');
const {validLogin} = require('../validations/validLogin');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const authController = require('../controllers/authController')

router.get('/perfil', usuarioController.getPerfilCliente);

router.put('/perfil/',[
    validateCliente,
    validarCampos
], usuarioController.updateCliente);

router.post('/perfil',[
    validateCliente,
    validarCampos
], usuarioController.createCliente);
router.post('/login',[
    validLogin,
    validarCampos
], authController.login);
module.exports = router;
