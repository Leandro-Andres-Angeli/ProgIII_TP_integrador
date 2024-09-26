const express = require('express');

const dotenv = require('dotenv');

dotenv.config();

const claimRoutes = require('./src/routes/claimsRoutes');
const PORT = process.env.SERVER_PORT || 3001;
const bodyParser = require('body-parser');
const pool = require('./src/config/dbConfig');
const passport = require('passport');

const {
  handleTokenValidity,
  passportJWTStrategy,
  passportLocalStrategy,
  generateToken,
  handleLogin,
} = require('./src/controllers/auth');
const usuarioRoutes = require('./src/routes/usuarioRoutes');
passport.use(passportJWTStrategy);
passport.use(passportLocalStrategy);
const server = express();
server.use(bodyParser.json());

server.use(express.json());

server.post('/api/login', handleLogin, generateToken);

server.use(function (req, res, next) {
  if (req.url === '/api/usuarios' && req.method === 'POST') {
    return next();
  } else {
    return handleTokenValidity(req, res, next);
  }
});

server.use('/api', claimRoutes);
server.use('/api', usuarioRoutes);

const checkConnection = async () => {
  try {
    await pool.getConnection();
    pool.releaseConnection();
  } catch (error) {
    console.log('Error conectandose a DB');
  }
};
checkConnection();

server.get('/*', (req, res) => {
  return res.status(404).json({ message: 'no existe ruta' });
});
server.listen(PORT, () => {
  console.log(`running on ${PORT}`);
});
