const pool = require('../config/dbConfig');

const {
  getClaimsQueryAccordingUserType,
  patchClaimsQueryAccordingUserType,
} = require('../utils/claimsQueries');

class Claims {
  constructor() {}
  getClaims = async (idTipoUsuario, idUsuario) => {
    const connection = await pool.getConnection();
    const { query, args } = getClaimsQueryAccordingUserType[idTipoUsuario](
      idTipoUsuario === 1 ? null : idUsuario
    );

    const [queryResult] = await connection.query(query, args);

    connection.release();
    return queryResult;
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
  patchClaim = async (body, userId) => {
    const { claimId, claimNewStatus } = body;
    const { idTipoUsuario } = body.user;

    const connection = await pool.getConnection();
    const { query, args } =
      patchClaimsQueryAccordingUserType[idTipoUsuario](body);

    const [patchClaimQuery] = await connection.query(query, args);
    /*     const [patchClaimQuery] = await connection.query(
      'UPDATE reclamos r SET r.idReclamoEstado=? , fechaCancelado=NOW() , idUsuarioFinalizador=? WHERE r.idReclamo =? ;',
      [claimNewStatus, userId, claimId]
    ); */
    connection.release();
    return patchClaimQuery;
  };
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
