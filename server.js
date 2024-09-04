const express = require('express');
const pool = require('./src/config/dbConfig');
const moment = require('moment');
const claimTypes = require('./src/utils/claimsStatus');
require('dotenv').config();
const PORT = process.env.SERVER_PORT || 3001;

const server = express();
server.use(express.json());
/* USERS */
server.get('/api/users', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [users] = await connection.query('SELECT * FROM usuarios');

    connection.release();
    return res.status(200).json({ ok: true, users });
  } catch (error) {
    return res.status(500).json({ ok: false, message: 'error de servidor' });
  }
});
/* USERS */

/* CLAIMS */
/* get reclamo by id  */
server.get('/api/claims/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();
    const [userClaims] = await connection.query(
      `SELECT * FROM reclamos WHERE  idUsuarioCreador=${id}`
    );
    if (!Boolean(userClaims.length)) {
      return res.status(404).json({
        ok: false,
        message: 'no hay reclamos hechos por este usuario',
      });
    }
    connection.release();
    return res.status(200).json({ ok: true, claims: userClaims });
  } catch (error) {
    return res.status(500).json({ ok: false, message: 'error de servidor' });
  }
});
/* get reclamo by id  */
/* post reclamo */

/* post reclamo */

/* update reclamo */
const handleUpdateQuery1 = (userId, claimId, claimStatus) => {
  fechaFinalizado = moment().format('YYYY-MM-DD hh:mm:ss');
  console.log(fechaFinalizado);

  return claimStatus == 4
    ? `UPDATE reclamos set  idReclamoEstado = ${claimStatus} , fechaFinalizado = CURRENT_DATE()  ,idUsuarioFinalizador = ${userId}  WHERE idReclamo = ${claimId} `
    : `UPDATE reclamos set  idReclamoEstado = ${claimStatus} WHERE idReclamo = ${claimId}`;
};
server.put('/api/claims/:userId/:claimId/:claimStatus', async (req, res) => {
  try {
    let { userId, claimId, claimStatus } = req.params;
    [userId, claimId, claimStatus] = [userId, claimId, claimStatus].map((e) =>
      Number(e)
    );

    const connection = await pool.getConnection();
    // await connection.execute(
    //   `UPDATE reclamos set  idReclamoEstado = ${claimStatus} WHERE idReclamo = ${claimId}`
    // );

    /* await connection.execute(handleUpdateQuery1(userId, claimId, claimStatus)); */
    connection.release();

    return res.status(204).json({ ok: true, message: 'reclamo actualizado' });
  } catch (err) {
    /*   console.log(err); */

    return res.status(500).json({ ok: 'false', message: err.message });
  }
});
/* upate reclamo */

/* CLAIMS */

server.listen(PORT, () => {
  console.log(`running on ${PORT}`);
});
