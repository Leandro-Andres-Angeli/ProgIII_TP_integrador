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
const { passportLocalStrategy, generateToken } = require('../middlewares/auth');

const router = Router();
/* 
Email ya registrado 4 test
daetar@correo.com 
Email ya registrado 4 test
*/

passport.use(passportLocalStrategy);
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
      console.log(createUser);

      return res.status(403).json({ ok: true, message: 'usuario creado' });
    } catch (err) {
      console.log(err);

      return res.status(500).json({ message: 'error de servidor' });
    }
  }
);
/* 
router.post(
  '/login',
  function (req, res, next) {
    passport.authenticate(
      'local',
      { session: false },
      function (err, user, info) {
        console.log('user');
        console.log(user);
      }
    );
  },
  async (req, res) => {
    try {
      const password = req.baseUrl;
      const hashedPassword = await bcrypt.hash(password, 10);
      users.push({
        id: Date.now(),
        username: 'user',
        password: hashedPassword,
      });
      return res.status(200).json({ ok: true });
    } catch (err) {
      res.status(400).json({ err: err.message });
    }
  }
); */

/* router.post(
  '/login',

  passport.authenticate('local', { session: false }),

  async (req, res) => {
    try {
      const password = req.baseUrl;
      const hashedPassword = await bcrypt.hash(password, 10);
      users.push({
        id: Date.now(),
        username: 'user',
        password: hashedPassword,
      });
      return res.status(200).json({ ok: true });
    } catch (err) {
      res.status(400).json({ err: err.message });
    }
  }
); */
/* app.get('/login', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect('/login');
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      return res.redirect('/users/' + user.username);
    });
  })(req, res, next);
}); */

/* router.post(
  '/login',
  function (req, res, next) {
    passport.authenticate(
      'local',
      { session: false },
      function (err, user, info) {
        if (!user) {
          return res.status(401).json({ ok: false, message: err.message });
        }

        req.logIn(user, { session: false }, async function (err) {
          if (err) return next(err);
          const body = {
            id: user.idUsuario,
            email: user.correoElectronico,
            rol: user.idTipoUsuario,
          };
          const token = jwt.sign({ user: body }, 'secret');
          return res.json({ token });
        });
      }
    )(req, res, next);
  },

  (req, res) => {
    return res.status(400).json({ ok: true });
  }
); */
router.post(
  '/login',
  function (req, res, next) {
    passport.authenticate(
      'local',
      { session: false },
      function (err, user, info) {
        if (!user) {
          return res.status(401).json({ ok: false, message: err.message });
        }
        req.body.user = user;
        next();
      }
    )(req, res, next);
  },

  generateToken
);
module.exports = router;
