const passport = require('passport');
const { Strategy } = require('passport-local');

const dotenv = require('dotenv');

dotenv.config();

const pool = require('../config/dbConfig');

const generateToken = (req, res, next) => {
  console.log('user', req.Login);
  next();
};
const passportLocalStrategy = new Strategy(
  { usernameField: 'email' },
  async (username, password, cb) => {
    try {
      const connection = await pool.getConnection();

      const [user] = await connection.query(
        `SELECT * FROM usuarios WHERE correoElectronico = '${username}' AND contrasenia =sha2('${password}',256) `
      );

      if (!user[0]) {
        throw new Error('Error de autenticacion');
      }
      connection.release();
      cb(null, user[0]);
    } catch (error) {
      return cb(new Error('Error de servidor'), false);
    }
  }
);

module.exports = { passportLocalStrategy, generateToken };
