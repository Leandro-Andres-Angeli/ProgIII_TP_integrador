const { check, validationResult } = require('express-validator');

const validateCliente = [
  check('correoElectronico')
    .notEmpty()
    .withMessage('El campo de email no puede estar vacío.')
    .isEmail()
    .withMessage('Debe ser un email válido con formato correcto.'),
  
  check('contrasenia')
    .notEmpty()
    .withMessage('La contraseña es requerida.')
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener mínimo 6 caracteres.'),
  
  check('nombre')
    .notEmpty()
    .withMessage('El nombre es requerido.'),

  check('apellido')
    .notEmpty()
    .withMessage('El campo de apellido no puede estar vacío.'),

  check('idTipoUsuario')
    .notEmpty()
    .withMessage('El campo idTipoUsuario no puede estar vacío.')
    .isInt()
    .withMessage('El campo idTipoUsuario debe ser un número entero.'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = { validateCliente };
