const pool = require('../config/dbConfig');
const ClaimsService = require('../services/claimService');
const { sendEmail } = require('../utils/sendEmail');

class ClaimController {
  constructor() {
    this.service = new ClaimsService();
  }
  postClaim = async (req, res) => {
    try {
      const { asunto, descripcion, idReclamoTipo } = req.body;
      const { idUsuario } = req.body.user;

      const newClaimQuery = await this.service.postClaim(
        asunto,
        descripcion,
        idReclamoTipo,
        idUsuario
      );

      if (newClaimQuery.affectedRows === 0) {
        return res
          .status(500)
          .json({ ok: false, message: 'Error creando nuevo Reclamo' });
      }

      return res.status(200).json({
        ok: true,
        message: `Reclamo creado con exito por usuario numero ${idUsuario}`,
      });
    } catch (error) {
      return res.status(500).json({ ok: false, message: 'Error de servidor' });
    }
  };

  getClaimsByClientId = async (req, res) => {
    const userId = Number(req.params.userId);
  };

  getClaims = async (req, res) => {
    const { user } = req.body;

    /*   if (idTipoUsuario === 1) {
      const [getReclamosAdmin] = await connection.query(
        'SELECT r.* from reclamos r'
      );

      queryResult = getReclamosAdmin;
    }
    if (idTipoUsuario === 2) {
      const [getReclamosByOffice] = await connection.query(
        'SELECT r.* from reclamos r  WHERE idReclamoTipo=( SELECT of.idOficina  FROM usuarios_oficinas  of WHERE idUsuario=?);',
        [user.idUsuario]
      );
      return getReclamosByOffice;
    }
    if (idTipoUsuario === 3) {
      const [getReclamosByUserId] = await connection.query(
        'SELECT r.* from reclamos r  WHERE idUsuarioCreador = ?',
        [user.idUsuario]
      );
      return getReclamosByUserId;
    }
 */
    const queryResult = await this.service.getClaims(user);
    if (queryResult.length === 0) {
      return res
        .status(404)
        .json({ ok: true, message: 'No hay reclamos para este usuario' });
    }
    return res.status(200).json({ ok: true, claims: queryResult });
  };
  patchClaims = async (req, res) => {
    try {
      const { user } = req.body;
      const { nombre, apellido, correoElectronico } = user;

      const { claimId } = req.body;
      const claimNewStatus = Number(req.body.claimNewStatus);

      const patchResult = await this.service.patchClaims(
        req.body,
        user.idUsuario
      );
      if (patchResult?.affectedRows !== 1) {
        throw Error('Error actualizando reclamo');
      }
      const [claimStatusDesc] = await pool.execute(
        'SELECT descripcion FROM `reclamos_estado` rt WHERE rt.idReclamosEstado = ?',
        [claimNewStatus]
      );

      sendEmail({
        name: nombre + ' ' + apellido,
        correoElectronico,
        status: claimStatusDesc[0].descripcion,
      });
      return res
        .status(200)
        .json({ ok: true, message: 'Reclamo modificado con exito' });
    } catch (error) {
      return res
        .status(500)
        .json({ ok: false, message: error.message || 'Error de servidor' });
    }
  };
}
//POST  CLAIM
/* exports.postClaim = async (req, res) => {
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
    return res.status(500).json({ ok: false, message: 'Error de servidor' });
  }
}; */
//POST  CLAIM

//GET  CLAIM BY USER ID
/* const getClaimsByClientId = async (req, res) => {
  const userId = Number(req.params.userId);

  const connection = await pool.getConnection();
  const [getClaimsByClientId] = await connection.query(
    'SELECT * FROM `reclamos` r  where r.idUsuarioCreador=? ',
    [userId]
  );

  connection.release();
  return getClaimsByClientId;
}; */

/* exports.getClaims = async (req, res) => {
  const { userId } = req.params;
  const connection = await pool.getConnection();
  const [getUserType] = await connection.query(
    'SELECT  idTipoUsuario  from usuarios  WHERE idUsuario = ?',
    [userId]
  );
  if (getUserType.length === 0) {
    return res.status(404).json({ ok: true, message: 'No existe usuario' });
  }

  const idTipoUsuario = Number(getUserType[0].idTipoUsuario);
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
}; */
//GET  CLAIM BY USER ID

/* exports.patchClaims = async (req, res) => {
  try {
    const { claimId } = req.body;
    const claimNewStatus = Number(req.body.claimNewStatus);
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
        'UPDATE reclamos r SET r.idReclamoEstado=?   WHERE r.idReclamo =?  ',
        claimNewStatus,

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
        return res.status(403).json({
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
    if (idTipoUsuario === 3 && claimNewStatus !== 3) {
      return res
        .status(403)
        .json({ ok: true, message: 'No autorizado a realizar esta accion' });
    }
    if (idTipoUsuario === 3) {
      [claim] = await connection.query(
        'UPDATE reclamos r SET r.idReclamoEstado=? , r.idUsuarioFinalizador=?  WHERE r.idReclamo=? ',
        [claimNewStatus, userId, claimId]
      );
    }

    if (claim.length === 0) {
      return res
        .status(404)
        .json({ ok: false, message: 'No se encontro reclamo' });
    }

    connection.release();
    return res
      .status(200)
      .json({ ok: true, message: 'Reclamo modificado con exito' });
  } catch (error) {
    console.log(error.message);

    return res.status(500).json({ ok: false, message: 'Error de servidor' });
  }
}; */
module.exports = ClaimController;
