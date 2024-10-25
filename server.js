require('dotenv').config();
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
const adminRoutes_v2 = require('./src/routes/v2/adminRoutes_v2');
const clienteRoutes = require('./src/routes/clienteRoutes');

const { validLogin } = require('./src/validations/validLogin');
const { validateCreateUsuario } = require('./src/validations/usuarioValidator');

const { isAdmin, isClient } = require('./src/middlewares/authorization');
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.SERVER_PORT || 3001;

const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');

const reportesRoutes = require('./src/routes/reportesRoutes');

passport.use(passportJWTStrategy);
passport.use(passportLocalStrategy);

const server = express();

server.use(express.json());

server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Login de usuario existente
server.post('/api/login', [validLogin, handleLogin], generateToken);
// Registro de nuevo cliente
server.post(
  '/api/registro',
  [validateCreateUsuario],
  usuarioController.createCliente
);

server.use('/api/reclamos', claimRoutes);
server.use('/api/clientes', [handleTokenValidity, isClient], clienteRoutes);
server.use('/api/admin', [handleTokenValidity, isAdmin], adminRoutes);
server.use('/api/v2/admin/', [handleTokenValidity, isAdmin], adminRoutes_v2);

server.use('/api/reportes', reportesRoutes);
/* refactor later */
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
