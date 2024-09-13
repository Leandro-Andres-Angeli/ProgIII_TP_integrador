const express = require('express');

const dotenv = require('dotenv');

dotenv.config();
const pool = require('./src/config/dbConfig');
const PORT = process.env.SERVER_PORT || 3001;

const server = express();
server.use(express.json());

server.post('/api/claim', async (req, res) => {
  try {
    const { asunto, descripcion, idReclamoTipo } = req.body;
    const connection = await pool.getConnection();
    const [newClaimQuery] = await connection.query(
      'INSERT INTO reclamos (asunto , descripcion , fechaCreado,idReclamoTipo , idReclamoEstado , idUsuarioCreador) VALUES (?,?,?,?,1,1)',
      [asunto, descripcion, new Date(), idReclamoTipo]
    );
    console.log(newClaimQuery);
    if (newClaimQuery.affectedRows === 0) {
      return res
        .status(500)
        .json({ ok: false, message: 'Error creando nuevo Reclamo' });
    }
    connection.release();
    return res
      .status(200)
      .json({ ok: true, message: 'Reclamo creado con exito' });
  } catch (error) {
    res.status(500).json({ ok: false, message: 'Error de servidor' });
  }
});
server.get('/*', (req, res) => {
  return res.status(404).json({ message: 'no existe ruta' });
});
server.listen(PORT, () => {
  console.log(`running on ${PORT}`);
});
