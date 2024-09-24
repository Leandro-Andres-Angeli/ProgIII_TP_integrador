const pool = require('../config/dbConfig');

class ClaimsService {
  constructor() {}

  postClaim = async (asunto, descripcion, idReclamoTipo) => {
    const connection = await pool.getConnection();
    const [newClaimQuery] = await connection.query(
      'INSERT INTO reclamos (asunto , descripcion , fechaCreado,idReclamoTipo , idReclamoEstado , idUsuarioCreador) VALUES (?,?,?,?,1,1)',
      [asunto, descripcion, new Date(), idReclamoTipo]
    );
    connection.release();
    return newClaimQuery;
  };
  patchClaims = async (idTipoUsuario) => {};
}
module.exports = ClaimsService;
