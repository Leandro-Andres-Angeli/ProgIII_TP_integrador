const passport = require('passport');
const { Strategy } = require('passport-local');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const pool = require('../config/dbConfig');

const generateToken = (req, res) => {
  const {
    body: { user },
    logIn,
  } = req;
  logIn(user, { session: false }, async (err) => {
    if (err) return err;
    const body = {
      id: user.idUsuario,
      email: user.correoElectronico,
      rol: user.idTipoUsuario,
    };

    const token = jwt.sign({ user: body }, 'secret', { expiresIn: '90d' });
    return res.status(200).json({
      ok: true,
      message: 'Autenticacion exitosa',
      usuario: { ...body, token },
    });
  });
};
const passportLocalStrategy = new Strategy(
  { usernameField: 'email' },
  async (username, password, cb) => {
    try {
      const connection = await pool.getConnection();

      const [user] = await connection.query(
        `SELECT * FROM usuarios WHERE correoElectronico = '${username}' AND contrasenia =sha2('${password}',256) `
      );
      console.log(user.length);

      if (!Boolean(user.length)) {
        console.log('in');

        return cb(new Error('Error de autenticacion'), false);
      }
      connection.release();
      return cb(null, user[0]);
    } catch (error) {
      return cb(new Error('Error de servidor'), false);
    }
  }
);

function handleLogin(req, res, next) {
  passport.authenticate('local', { session: false }, function (err, user) {
    if (!user) {
      return res.status(401).json({ ok: false, message: err.message });
    }
    req.body.user = user;
    next();
  })(req, res, next);
}

function handleTokenValidity(req, res, next) {
  passport.authenticate('jwt', { session: false }, function (err, user) {
    if (!user) {
      return res.status(401).json({ ok: false, message: err.message });
    }
    req.body.user = user;
    next();
  })(req, res, next);
}
module.exports = { passportLocalStrategy, generateToken, handleLogin };
