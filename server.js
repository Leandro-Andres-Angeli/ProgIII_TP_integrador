const express = require('express');

const dotenv = require('dotenv');

dotenv.config();
const pool = require('./src/config/dbConfig');
const PORT = process.env.SERVER_PORT || 3001;

const server = express();
server.use(express.json());

server.get('/*', (req, res) => {
  return res.status(404).json({ message: 'no existe ruta' });
});
server.listen(PORT, () => {
  console.log(`running on ${PORT}`);
});
