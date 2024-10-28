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
const clienteController = require('./src/controllers/clienteController');
const claimRoutes = require('./src/routes/claimsRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
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
  clienteController.createCliente
);

server.use('/api/reclamos', claimRoutes);
server.use('/api/clientes', [handleTokenValidity, isClient], clienteRoutes);
server.use('/api/admin', [handleTokenValidity, isAdmin], adminRoutes);

<<<<<<< HEAD
server.use('/api/v1/reportes', reportesRoutes);
/* refactor later */
=======
server.use('/api/reportes', [handleTokenValidity, isAdmin], reportesRoutes);

>>>>>>> 8848fd5eca466e66f73e018dc81f2033837238c6
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
