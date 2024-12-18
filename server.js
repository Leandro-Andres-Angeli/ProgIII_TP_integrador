const express = require('express');
const pool = require('./src/config/dbConfig');
const passport = require('passport');
const dotenv = require('dotenv');
dotenv.config();

const {
  handleTokenValidity,
  passportJWTStrategy,
  passportLocalStrategy,
  generateToken,
  handleLogin,
} = require('./src/controllers/auth');

const { validLogin } = require('./src/validations/validLogin');
const { validateCreateUsuario } = require('./src/validations/usuarioValidator');
const { isAdmin, isClient } = require('./src/middlewares/authorization');

const clienteController = require('./src/controllers/clienteController');
const claimRoutes = require('./src/routes/claimsRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const clienteRoutes = require('./src/routes/clienteRoutes');
const reportesRoutes = require('./src/routes/reportesRoutes');

const PORT = process.env.SERVER_PORT || 3001;

passport.use(passportJWTStrategy);
passport.use(passportLocalStrategy);

const server = express();
server.use(express.json());

const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Login de usuario existente
server.post('/api/login', [validLogin, handleLogin], generateToken);
// Registro de nuevo cliente
server.post(
  '/api/registro',
  [validateCreateUsuario],
  clienteController.createCliente
);

server.use('/api/reclamos', claimRoutes);
server.use('/api/clientes', [handleTokenValidity, isClient], clienteRoutes);
server.use('/api/admin', [handleTokenValidity, isAdmin], adminRoutes);

server.use('/api/reportes', reportesRoutes);

const checkConnection = async () => {
  try {
    await pool.getConnection();

    pool.releaseConnection();
  } catch (error) {
    console.log('Error conectandose a DB');
  }
};
checkConnection();

server.use('/*', (req, res) => {
  return res.status(404).json({ message: 'no existe ruta' });
});

server.listen(PORT, () => {
  console.log(`running on ${PORT}`);
});
