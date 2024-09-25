const pool = require('../config/dbConfig');
const Claims = require('../database/claims');

class ClaimsService {
  constructor() {
    this.claims = new Claims();
  }

  postClaim = async (asunto, descripcion, idReclamoTipo, idUsuario) => {
    /*   const connection = await pool.getConnection();
    const [newClaimQuery] = await connection.query(
      'INSERT INTO reclamos (asunto , descripcion , fechaCreado,idReclamoTipo , idReclamoEstado , idUsuarioCreador) VALUES (?,?,?,?,1,1)',
      [asunto, descripcion, new Date(), idReclamoTipo]
    );
    connection.release(); */

    const newClaimQuery = await this.claims.postClaim(
      asunto,
      descripcion,
      idReclamoTipo,
      idUsuario
    );
    return newClaimQuery;
  };
  getClaims = async ({ idTipoUsuario, idUsuario }) => {
    return await this.claims.getClaims(idTipoUsuario, idUsuario);
    /*     if (idTipoUsuario === 1) {
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
    }
    connection.release();
    return queryResult; */
  };
  patchClaims = async (idTipoUsuario) => {};
}
module.exports = ClaimsService;
