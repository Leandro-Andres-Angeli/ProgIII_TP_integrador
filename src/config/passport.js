const passport = require('passport');
const passportJWT = require('passport-jwt');
const service = require('../services/usuarioService');
require('dotenv').config();

const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = passportJWT.Strategy;

passport.use(
  new LocalStrategy(
    {
      usernameField: 'correoElectronico',
      passwordField: 'contrasenia',
    },
    async (correoElectronico, contrasenia, cb) => {
      try {
        const user = await service.getUsuarioAuth(
          correoElectronico,
          contrasenia
        );
        if (!user) {
          return cb(null, false, {
            message: 'Correo electrónico y/o contraseña incorrectos.',
          });
        } else {
          return cb(null, user, { message: 'Login correcto!' });
        }
      } catch (exc) {
        cb(exc);
      }
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    async (jwtPayload, cb) => {
      const user = await service.getUsuarioById(jwtPayload.idUsuario);
      if (user) {
        return cb(null, user);
      } else {
        return cb(null, false, { message: 'Token incorrecto.' });
      }
    }
  )
);
