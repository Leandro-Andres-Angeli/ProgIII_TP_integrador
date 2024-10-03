const {check} = require ('express-validator1');

exports.validateUsuario = [
    check ('email')
        .isEmail().withMessage('debe proporcionar un email valido')
        .matches(/@gmail\.com$/).withMessage('El email debe ser un correo de Gmail'),
    check ('password')
        .isLength({min : 6}).withMessage('la contraseña debe tener minimo 6 caracteres')
        .notEmpty().withMessage('la contraseña es obligatoria'),
];