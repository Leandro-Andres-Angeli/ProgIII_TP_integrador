const express = require('express');
const pool = require('./src/config/dbConfig');
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
    return res.status(500).json({ ok: false, message: error.message });
  }
});
/* USERS */

/* CLAIMS */
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
    return res.status(500).json({ ok: false, message: error.message });
  }
});

/* CLAIMS */

server.listen(PORT, () => {
  console.log(`running on ${PORT}`);
});
