const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');
const { validarCorreo, validarContrasenia } = require('./validLogin');

const validarNombre = check('nombre')
  .notEmpty()
  .withMessage('Debe ingresar un nombre.');
const validarApellido = check('apellido')
  .notEmpty()
  .withMessage('Debe ingresar un apellido.');

const validateCreateUsuario = [
  validarCorreo,
  validarContrasenia,
  validarNombre,
  validarApellido,
  validarCampos,
];

const validateUpdateUsuario = [validarNombre, validarApellido, validarCampos];

const validateUpdateCorreo = [validarCorreo, validarCampos];

const validateUpdateContrasenia = [validarContrasenia, validarCampos];

module.exports = {
  validateCreateUsuario,
  validateUpdateUsuario,
  validateUpdateCorreo,
  validateUpdateContrasenia,
};
