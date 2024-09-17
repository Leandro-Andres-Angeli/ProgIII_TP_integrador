const express = require('express');
const bodyParser = require('body-parser');
const usuarioRoutes = require('./src/routes/usuarioRoutes.js');

const PORT = process.env.SERVER_PORT || 3001;

const app = express();
app.use(bodyParser.json());

app.use('/api', usuarioRoutes);

app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
