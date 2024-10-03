const { validationResult } = require('express-validator');

exports.validarCampos = (req, res, next) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        const errorList = errors.array().map(err => {
            return { field: err.param, message: err.msg };
        });

        return res.status(400).json({
            ok: false,
            errors: errorList
        });
    }

    next();
};

module.exports = { validarCampos };
