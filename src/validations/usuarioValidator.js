const { check, validationResult } = require('express-validator');

const validateCliente = [
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
  
  check('nombre')
    .notEmpty()
    .withMessage('Debe ingresar un nombre.'),

  check('apellido')
    .notEmpty()
    .withMessage('Debe ingresar un apellido.'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = { validateCliente };
