const express = require('express');

const dotenv = require('dotenv');

const claimController = require('../controllers/claimController');
const { pool } = require('../config/dbConfig');
const router = express.Router();
dotenv.config();

const PORT = process.env.SERVER_PORT || 3001;

// const Claim = {
//   getClaims: async (id) => {
//     const query = `SELECT * FROM reclamos`;
//     const [result] = await pool.execute(query);

//     return result;
//   },
// };

// const getAllClaims = async (req, res) => {
//   try {
//     const conn = await pool.getConnection();
//     console.log(conn);

//     return res.status(200).json({ ok: true, p });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ ok: false });
//   }
// };

// router.get('/claims', async (req, res) => {
//   try {
//     const conn = await pool.getConnection();
//     conn.release();
//     return res.status(200).json({ ok: true });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ ok: false });
//   }
// });

//POST  CLAIM
router.post('/claim', async (req, res) => {
  try {
    const { asunto, descripcion, idReclamoTipo } = req.body;
    const connection = pool.getConnection();
    // const [newClaimQuery] = await connection.query(
    //   'INSERT INTO reclamos (asunto , descripcion , fechaCreado,idReclamoTipo , idReclamoEstado , idUsuarioCreador) VALUES (?,?,?,?,1,1)',
    //   [asunto, descripcion, new Date(), idReclamoTipo]
    // );

    //   if (newClaimQuery.affectedRows === 0) {
    //     return res
    //       .status(500)
    //       .json({ ok: false, message: 'Error creando nuevo Reclamo' });
    //   }
    connection.release();
    return res
      .status(200)
      .json({ ok: true, message: 'Reclamo creado con exito' });
  } catch (error) {
    return res.status(500).json({ ok: false, message: 'Error de servidor' });
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
router.get('/claims/:userId', async (req, res) => {
  const { userId } = req.params;
  const connection = await pool.getConnection();
  const [getUserType] = await connection.query(
    'SELECT  idTipoUsuario  from usuarios  WHERE idUsuario = ?',
    [userId]
  );
  if (getUserType.length === 0) {
    return res.status(404).json({ ok: true, message: 'No existe usuario' });
  }

  const { idTipoUsuario } = getUserType[0];
  let queryResult;

  if (idTipoUsuario === 1) {
    const [getReclamosAdmin] = await connection.query(
      'SELECT r.* from reclamos r'
    );

    queryResult = getReclamosAdmin;
  }
  if (idTipoUsuario === 2) {
    const [getReclamosByOffice] = await connection.query(
      'SELECT r.* from reclamos r  WHERE idReclamoTipo=( SELECT of.idOficina  FROM usuarios_oficinas  of WHERE idUsuario=?);',
      [userId]
    );
    queryResult = getReclamosByOffice;
  }
  if (idTipoUsuario === 3) {
    queryResult = await getClaimsByClientId(req, res);
  }

  if (queryResult.length === 0) {
    return res
      .status(404)
      .json({ ok: true, message: 'No hay reclamos para este usuario' });
  }
  return res.status(200).json({ ok: true, claims: queryResult });
});

//GET  USER CLAIMS

//CANCEL INIT CLAIM
router.patch('/claims/:userId', async (req, res) => {
  try {
    const { claimId, claimNewStatus } = req.body;
    const { userId } = req.params;

    const connection = await pool.getConnection();
    const [userType] = await connection.query(
      'SELECT  idTipoUsuario  from usuarios  WHERE idUsuario=?',
      [userId]
    );

    if (userType.length === 0) {
      return res.status(404).json({ ok: true, message: 'No existe usuario' });
    }
    const { idTipoUsuario } = userType[0];

    let claim = [];
    if (idTipoUsuario === 1) {
      const [getReclamosAdmin] = await connection.query(
        'SELECT * from reclamos WHERE idReclamo=? ',
        claimId
      );
      claim = getReclamosAdmin;
    }
    if (idTipoUsuario === 2) {
      const [getEmpOfficeId] = await connection.query(
        'SELECT uo.idOficina FROM usuarios u  JOIN usuarios_oficinas uo ON u.idUsuario = uo.idUsuario WHERE u.idUsuario = ? ',
        userId
      );
      [claim] = await connection.query(
        'SELECT * FROM reclamos WHERE idReclamo=?',
        [claimId]
      );
      if (claim[0].idReclamoTipo !== getEmpOfficeId) {
        res.status(403).json({
          ok: true,
          message:
            'No puede modificar reclamos que no pertenecen a su propia oficina',
        });
      }

      if (!getEmpOfficeId) {
        return res.status(404).json({
          ok: true,
          message: 'Error obteniendo informacion de usuario',
        });
      }
    }

    //  const [claim1] = await connection.query(
    //   'SELECT * FROM reclamos WHERE idReclamo = ?',
    //   claimId
    // );
    if (claim.length === 0) {
      return res
        .status(404)
        .json({ ok: false, message: 'No se encontro reclamo' });
    }
    console.log(claim);

    connection.release();
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.log(error.message);

    return res.status(500).json({ ok: false, message: 'Error de servidor' });
  }
});
module.exports = router;
