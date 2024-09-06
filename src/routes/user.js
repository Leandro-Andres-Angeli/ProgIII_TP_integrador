const { Router } = require('express');
const { check, body } = require('express-validator');
const { validateFields } = require('../middlewares/validate');
const {
  checkAvailableEmail,
  checkValidRole,
} = require('../middlewares/validations');
const pool = require('../config/dbConfig');
const userRoles = require('../utils/userRoles');
const router = Router();
/* 
Email ya registrado 4 test
daetar@correo.com 
Email ya registrado 4 test
*/
router.post(
  '/',
  [
    check('name', 'campo nombre requerido').notEmpty(),
    check('email', 'campo email requerido').notEmpty(),
    check('email', 'ingrese un email valido').isEmail(),
    check('password', 'campo password requerido').notEmpty(),
    check('lastName', 'campo apellido requerido').notEmpty(),
    check('role', 'campo role requerido').notEmpty(),
    body('email').custom(checkAvailableEmail),
    body('role').custom(checkValidRole),
    validateFields,
  ],
  (req, res) => {
    try {
      const { name, lastName, email, password, role } = req.body;
      const newUser = {
        name,
        email,
        password,
        lastName,
        role: userRoles[role],
      };
      /* 
      Test query
      INSERT INTO usuarios (nombre , apellido ,correoElectronico,contrasenia , idTipoUsuario , activo) VALUES ("J","J","mail@mail","123",1,1) 
      Test query
      */
      return res.status(403).json({ message: 'usuario creado' });
    } catch (err) {
      return res.status(500).json({ message: 'error de servidor' });
    }
  }
);
module.exports = router;
