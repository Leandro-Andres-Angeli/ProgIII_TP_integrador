const express = require('express');
const bodyParser = require('body-parser');
const { isAdmin } = require('./src/middlewares/auth');
const passport = require('passport');
require('./src/config/passport');
const usuarioRoutes = require('./src/routes/usuarioRoutes.js');
const authRoutes = require('./src/routes/authRoutes.js');

const PORT = process.env.SERVER_PORT || 3001;

const app = express();
app.use(bodyParser.json());

app.use('/api', authRoutes);
app.use(
  '/api',
  [passport.authenticate('jwt', { session: false }), isAdmin],
  usuarioRoutes
);

app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
