const { check } = require('express-validator');

const validateCliente = [
  check('email')
    .notEmpty()
    .withMessage('El campo de email no puede estar vacío.')

    .isEmail()
    .withMessage('Debe ser un email válido con formato correcto.'),
  
  check('password')
    .notEmpty()
    .withMessage('La contraseña es requerida.')
    
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener mínimo 6 caracteres.')
];

module.exports = { validateCliente };
