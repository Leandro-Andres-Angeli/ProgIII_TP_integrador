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
const pdfRoutes = require('./src/routes/pdfRoutes');

const { validLogin } = require('./src/validations/validLogin');
const { validateCreateUsuario } = require('./src/validations/usuarioValidator');

const { isAdmin, isClient } = require('./src/middlewares/authorization');
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.SERVER_PORT || 3001;

const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');
const { createObjectCsvStringifier } = require('csv-writer');
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
server.use('/api/pdf', [handleTokenValidity, isAdmin], pdfRoutes);
/* refactor later */
server.use('/api/csv', async (req, res) => {
  try {
    const [reclamos] = await pool.query(
      'SELECT r.idReclamo,r.asunto,r.descripcion,r.fechaCreado,r.fechaFinalizado,r.fechaCancelado,re.descripcion AS descripcionEstado,r.idReclamoTipo,r.idUsuarioCreador,r.idUsuarioFinalizador FROM reclamos r  join   reclamos_estado re  on r.idReclamoEstado = re.idReclamoEstado WHERE idReclamoTipo = ?',

      [1]
    );

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="data.csv"');

    // Create a CSV stringifier
    const csvStringifier = createObjectCsvStringifier({
      header: [
        { id: 'id', title: 'id' },
        { id: 'asunto', title: 'asunto' },
        { id: 'descripcion', title: 'descripcion' },
        { id: 'fecha creado', title: 'fecha creado' },
        { id: 'fecha finalizado', title: 'fecha finalizado' },
        { id: 'fecha cancelado', title: 'fecha cancelado' },
        { id: 'reclamo estado', title: 'reclamo estado' },
        { id: 'reclamo tipo', title: 'reclamo tipo' },
        { id: 'usuario creador', title: 'usuario creador' },
        { id: 'usuario finalizador', title: 'usuario finalizador' },
      ],
    });

    // Convert the list of objects to CSV format as a string
    const csvString =
      csvStringifier.getHeaderString() +
      csvStringifier.stringifyRecords(reclamos);

    // Send the CSV data as the response
    res.status(200).send(csvString);
  } catch (error) {
    console.log(error);

    res.status(500).json({ ok: false, message: 'error de servidor' });
  }
});
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
