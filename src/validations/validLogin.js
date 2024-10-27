const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');

const validarCorreo = check('correoElectronico')
  .notEmpty()
  .withMessage('El campo de email no puede estar vacío.')
  .isEmail()
  .withMessage('Debe ser un email válido con formato correcto (@.com).');

const validarContrasenia = check('contrasenia')
  .notEmpty()
  .withMessage('Se requiere una contraseña.')
  .isLength({ min: 6 })
  .withMessage('La contraseña debe tener mínimo 6 caracteres.');

const validLogin = [validarCorreo, validarContrasenia, validarCampos];

module.exports = { validLogin, validarCorreo, validarContrasenia };
