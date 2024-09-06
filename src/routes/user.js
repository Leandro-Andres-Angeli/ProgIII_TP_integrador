const { Router } = require('express');
const { check, body } = require('express-validator');
const { validateFields } = require('../middlewares/validate');
const checkAvailableEmail = require('../middlewares/checkAvailableEmail');
const pool = require('../config/dbConfig');
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
    body('email').custom(async (val) => {
      console.log(val);

      const connection = await pool.getConnection();
      const [getUserIfExists] = await connection.query(
        `SELECT * FROM usuarios WHERE  correoElectronico ='${val}'`
      );
      /*  console.log(getUserIfExists); */

      if (getUserIfExists.length > 0) {
        throw new Error('ya hay una cuenta asociada a ese email');
      }
      connection.release();
      return false;
    }),
    validateFields,
  ],
  (req, res) => {
    try {
      const { name, email, password } = req.body;

      return res.status(403).json({ message: 'usuario creado' });
    } catch (err) {
      return res.status(500).json({ message: 'error de servidor' });
    }
  }
);
module.exports = router;
