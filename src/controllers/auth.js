const passport = require('passport');
const { Strategy } = require('passport-local');
const JWTStrategy = require('passport-jwt').Strategy;
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const pool = require('../config/dbConfig');
const { ExtractJwt } = require('passport-jwt');

const generateToken = (req, res) => {
  const {
    body: { user },
    logIn,
  } = req;
  logIn(user, { session: false }, async (err) => {
    if (err) return err;

    const token = jwt.sign({ user }, 'secret', { expiresIn: '90d' });
    return res.status(200).json({
      ok: true,
      message: 'Autenticacion exitosa',
      usuario: { ...user, token },
    });
  });
};
//PASSPORT STRATEGIES
const passportLocalStrategy = new Strategy(
  { usernameField: 'email' },
  async (username, password, cb) => {
    try {
      const connection = await pool.getConnection();

      const [user] = await connection.query(
        `SELECT * FROM usuarios WHERE correoElectronico = '${username}' AND contrasenia =sha2('${password}',256) `
      );

      if (!Boolean(user.length)) {
        return cb(
          new Error('Correo electrónico y/o contraseña incorrectos.'),
          false
        );
      }
      connection.release();
      return cb(null, user[0]);
    } catch (error) {
      return cb(new Error('Error de servidor'), false);
    }
  }
);

//PASSPORT STRATEGIES
function handleLogin(req, res, next) {
  passport.authenticate('local', { session: false }, function (err, user) {
    if (!user) {
      return res.status(401).json({ ok: false, message: err.message });
    }
    req.body.user = user;
    next();
  })(req, res, next);
}

const passportJWTStrategy = new JWTStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secret',
  },
  async function (JWTPayload, cb) {
    try {
      if (!JWTPayload) {
        return cb(new Error('Error de autenticacion'), false);
      }

      const connection = await pool.getConnection();

      const { contrasenia, correoElectronico } = JWTPayload?.user;
      const [user] = await connection.query(
        `SELECT * FROM usuarios WHERE correoElectronico='${correoElectronico}' AND contrasenia='${contrasenia}'`
      );
      if (user.length === 0) {
        return cb(new Error('Error de autenticacion'), false);
      }

      connection.release();
      return cb(null, user);
    } catch (err) {
      return cb(new Error('Error de servidor'), false);
    }
  }
);

function handleTokenValidity(req, res, next) {
  passport.authorize('jwt', { session: false }, function (_, user, error) {
    if (!user) {
      return res.status(401).json({
        ok: false,
        message: error?.message || 'Error de autenticacion',
      });
    }

    req.body.user = user[0];

    next();
  })(req, res, next);
}
module.exports = {
  passportLocalStrategy,
  passportJWTStrategy,
  generateToken,
  handleLogin,
  handleTokenValidity,
};
