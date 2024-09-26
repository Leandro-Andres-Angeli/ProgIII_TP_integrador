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
  };
  patchClaims = async (idUsuario, claimNewStatus) => {
    return await this.claims.patchClaim(idUsuario, claimNewStatus);
  };
}
module.exports = ClaimsService;
