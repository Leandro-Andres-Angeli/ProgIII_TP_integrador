const express = require('express');

const dotenv = require('dotenv');

dotenv.config();
const pool = require('./src/config/dbConfig');
const PORT = process.env.SERVER_PORT || 3001;

const server = express();
server.use(express.json());
//POST  CLAIM
server.post('/api/claim', async (req, res) => {
  try {
    const { asunto, descripcion, idReclamoTipo } = req.body;
    const connection = await pool.getConnection();
    const [newClaimQuery] = await connection.query(
      'INSERT INTO reclamos (asunto , descripcion , fechaCreado,idReclamoTipo , idReclamoEstado , idUsuarioCreador) VALUES (?,?,?,?,1,1)',
      [asunto, descripcion, new Date(), idReclamoTipo]
    );

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
//GET  USER CLAIMS
const getClaimsByClientId = async (req, res) => {
  const userId = Number(req.params.userId);

  const connection = await pool.getConnection();
  const [getClaimsByClientId] = await connection.query(
    'SELECT * FROM `reclamos` r  where r.idUsuarioCreador=? ',
    [userId]
  );

  connection.release();
  return getClaimsByClientId;
};
server.get('/api/claims/:userId', async (req, res) => {
  const { userId } = req.params;
  const connection = await pool.getConnection();
  const getReclamosByOffice = await connection.query(
    'SELECT r.* from reclamos r  WHERE idReclamoTipo=( SELECT of.idOficina  FROM usuarios_oficinas  of WHERE idUsuario=?);',
    [userId]
  );
  console.log(getReclamosByOffice);

  const queryResult = await getClaimsByClientId(req, res);
  if (queryResult.length === 0) {
    return res
      .status(404)
      .json({ ok: true, message: 'No hay reclamos para este usuario' });
  }
  return res.status(200).json({ ok: true, claims: queryResult });
});

//GET  USER CLAIMS

server.get('/*', (req, res) => {
  return res.status(404).json({ message: 'no existe ruta' });
});
server.listen(PORT, () => {
  console.log(`running on ${PORT}`);
});
//POST  CLAIM
