const pool = require('../config/dbConfig');
const { get } = require('../routes/claimsRoutes');
const { getClaimsQueryAccordingUserType } = require('../utils/claimsQueries');

class Claims {
  constructor() {}
  getClaims = async (idTipoUsuario, idUsuario) => {
    const connection = await pool.getConnection();
    const { query, args } = getClaimsQueryAccordingUserType[idTipoUsuario](
      idTipoUsuario === 1 ? null : idUsuario
    );

    const [queryResult] = await connection.query(query, args);

    /* if (idTipoUsuario === 1) {
      const [getReclamosAdmin] = await connection.query(
        'SELECT r.* from reclamos r'
      );

      queryResult = getReclamosAdmin;
    }
    if (idTipoUsuario === 2) {
      const [getReclamosByOffice] = await connection.query(
        'SELECT r.* from reclamos r  WHERE idReclamoTipo=( SELECT of.idOficina  FROM usuarios_oficinas  of WHERE idUsuario=?);',
        [idUsuario]
      );
      queryResult = getReclamosByOffice;
    }
    if (idTipoUsuario === 3) {
      const [getReclamosByUserId] = await connection.query(
        'SELECT r.* from reclamos r  WHERE idUsuarioCreador = ?',
        [idUsuario]
      );
      queryResult = getReclamosByUserId;
    } */
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
  patchClaim = async (claimId, claimNewStatus) => {
    const connection = await pool.getConnection();
    const [patchClaimQuery] = await connection.query(
      'UPDATE reclamos r SET r.idReclamoEstado=?   WHERE r.idReclamo =? ;',
      [claimNewStatus, claimId]
    );
    return patchClaimQuery;
  };
}
module.exports = Claims;
