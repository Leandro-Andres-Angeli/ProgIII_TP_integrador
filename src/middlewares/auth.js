const passport = require('passport');
const { Strategy } = require('passport-local');
const pool = require('../config/dbConfig');

const checkIsLogged = (req, res, next) => {
  console.log('logged func in ');
  next();
};
const middleTest = (req, res, next) => {
  console.log('middle Test');
  next();
};

const passportStrategy = new Strategy(
  { usernameField: 'email' },
  async (username, password, cb) => {
    console.log(username);
    console.log(password);
    try {
      const connection = await pool.getConnection();

      const [user] = await connection.query(
        `SELECT * FROM usuarios WHERE correoElectronico = 's${username}' AND contrasenia =sha2('${password}',256) `
      );

      if (user.length !== 1) {
        throw new Error('error de autenticacion');
      }
      connection.release();
      cb(null, user);
    } catch (error) {
      cb(error, false, {
        message: error,
      });
    }
  }
);

module.exports = { checkIsLogged, middleTest, passportStrategy };
