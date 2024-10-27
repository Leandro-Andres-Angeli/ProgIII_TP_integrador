const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');

const validateCreateUsuario = [
  check('correoElectronico')
    .notEmpty()
    .withMessage('El campo de email no puede estar vacío.')
    .isEmail()
    .withMessage('Debe ser un email válido con formato correcto (@.com).'),

  check('contrasenia')
    .notEmpty()
    .withMessage('Se requiere una contraseña.')
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener mínimo 6 caracteres.'),

  check('nombre').notEmpty().withMessage('Debe ingresar un nombre.'),
  check('apellido').notEmpty().withMessage('Debe ingresar un apellido.'),

  validarCampos,
];

const validateUpdateUsuario = [
  check('nombre').notEmpty().withMessage('Debe ingresar un nombre.'),
  check('apellido').notEmpty().withMessage('Debe ingresar un apellido.'),

  validarCampos,
];

module.exports = { validateCreateUsuario, validateUpdateUsuario };
