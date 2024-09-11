const { Router } = require('express');
const { check, body } = require('express-validator');
const { validateFields } = require('../middlewares/validate');

const {
  checkAvailableEmail,
  checkValidRole,
} = require('../middlewares/validations');
const pool = require('../config/dbConfig');
const { userRoles } = require('../utils/userRoles');

const passport = require('passport');
const {
  passportLocalStrategy,
  generateToken,
  handleLogin,
  passportJWTStrategy,
  handleTokenValidity,
} = require('../middlewares/auth');

const router = Router();
/* 
Email ya registrado 4 test
daetar@correo.com 
Email ya registrado 4 test
*/

passport.use(passportLocalStrategy);
passport.use(passportJWTStrategy);
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
  async (req, res) => {
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
      const connection = await pool.getConnection();
      const [createUser] = await connection.query(
        `INSERT INTO usuarios (nombre , apellido ,correoElectronico,contrasenia , idTipoUsuario , activo) VALUES ('${newUser.name}' , '${newUser.lastName}' ,'${newUser.email}', sha2('${newUser.password}',256) , ${newUser.role} ,1)`
      );

      if (Number(createUser.affectedRows) !== 1) {
        throw Error('error creando usuario');
      }
      return res.status(403).json({ ok: true, message: 'usuario creado' });
    } catch (err) {
      console.log(err);

      return res.status(500).json({ message: 'error de servidor' });
    }
  }
);

router.post(
  '/login',
  check('email', 'campo email requerido').notEmpty(),
  check('email', 'ingrese un email valido').isEmail(),
  check('password', 'campo password requerido').notEmpty(),
  validateFields,
  handleLogin,
  generateToken
);
router.get(
  '/protected',
  /* check('email', 'campo email requerido').notEmpty(),
  check('email', 'ingrese un email valido').isEmail(),
  check('password', 'campo password requerido').notEmpty(),
  validateFields */
  handleTokenValidity,
  (req, res) => {
    console.log(req.body.user);
    return res.status(200).json({ ok: true });
  }
);
module.exports = router;
