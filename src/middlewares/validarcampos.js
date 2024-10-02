const {ValidationResult} = require('express-validator');

const validarCampos = (req,res,next) => {
    const errors = ValidationResult (req);
    if (!errors.isEmpty()){
        return res.status (400).json({ok: false, errors: errors.maped()});
    }
    next();
};
module.exports = { validarCampos };