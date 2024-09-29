const express = require('express');
const pool = require('./src/config/dbConfig');
const passport = require('passport');
const {
  handleTokenValidity,
  passportJWTStrategy,
  passportLocalStrategy,
  generateToken,
  handleLogin,
} = require('./src/controllers/auth');
const usuarioController = require('./src/controllers/usuarioController');
const claimRoutes = require('./src/routes/claimsRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const clienteRoutes = require('./src/routes/clienteRoutes');
const { isAdmin, isClient } = require('./src/middleware/authorization');
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.SERVER_PORT || 3001;

passport.use(passportJWTStrategy);
passport.use(passportLocalStrategy);

const server = express();

server.use(express.json());

// Login de usuario existente
server.post('/api/login', handleLogin, generateToken);
// Registro de nuevo cliente
server.post('/api/registro', usuarioController.createCliente);

server.use('/api', claimRoutes);
server.use('/api/clientes', [handleTokenValidity, isClient], clienteRoutes);
server.use('/api/admin', [handleTokenValidity, isAdmin], adminRoutes);

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
