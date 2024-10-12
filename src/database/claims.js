const pool = require('../config/dbConfig');

const {
  getClaimsQueryAccordingUserType,
  patchClaimsQueryAccordingUserType,
} = require('../utils/claimsQueries');

class Claims {
  constructor() {}
  getClaims = async (idUsuarioTipo, idUsuario) => {
    const connection = await pool.getConnection();
    const { query, args } = getClaimsQueryAccordingUserType[idUsuarioTipo](
      idUsuarioTipo === 1 ? null : idUsuario
    );

    const [queryResult] = await connection.query(query, args);

    connection.release();
    return queryResult;
  };
  getClaimById = async (claimId, userId) => {
    const claim = await pool.execute(
      'SELECT * FROM `reclamos` r  where r.idReclamo=? AND idUsuarioCreador = ?',
      [claimId, userId]
    );
    return claim;
  };
  postClaim = async (asunto, descripcion, idReclamoTipo, idUsuario) => {
    const connection = await pool.getConnection();
    const [newClaimQuery] = await connection.query(
      'INSERT INTO reclamos (asunto , descripcion , fechaCreado,idReclamoTipo , idReclamoEstado , idUsuarioCreador) VALUES (?,?,?,?,1,?)',
      [asunto, descripcion, new Date(), idReclamoTipo, idUsuario]
    );
    connection.release();
    return newClaimQuery;
  };
  patchClaimClient = async (claimId, userId, claimNewStatus) => {
    const patchClaim = await pool.execute(
      'UPDATE reclamos r SET r.idReclamoEstado=? , fechaCancelado=NOW() , idUsuarioFinalizador=? WHERE r.idReclamo =? ;',
      [claimNewStatus, userId, claimId]
    );
    return patchClaim;
  };
  /*   patchClaim = async (body, user) => {
    const { claimId, claimNewStatus } = body;
    const descripcion = body?.descripcion ?? null;
    const asunto = body?.asunto ?? null;
    const { idUsuarioTipo } = user;

    const connection = await pool.getConnection();
    const { query, args } = patchClaimsQueryAccordingUserType[idUsuarioTipo]({
      claimId,
      claimNewStatus,
      descripcion,
      asunto,
      user,
    });

    const [patchClaimQuery] = await connection.query(query, args);

    //     const [patchClaimQuery] = await connection.query(
    //   'UPDATE reclamos r SET r.idReclamoEstado=? , fechaCancelado=NOW() , idUsuarioFinalizador=? WHERE r.idReclamo =? ;',
    //   [claimNewStatus, userId, claimId]
    // ); 
    connection.release();
    return patchClaimQuery;
  }; */

  getClaimsByClientId = async (userId) => {
    const connection = await pool.getConnection();
    const [getClaimsByClientId] = await connection.query(
      'SELECT * FROM `reclamos` r  where r.idUsuarioCreador=? ',
      [userId]
    );

    connection.release();
    return getClaimsByClientId;
  };
}
module.exports = Claims;
