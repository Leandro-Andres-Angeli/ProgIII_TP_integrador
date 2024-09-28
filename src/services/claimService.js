const pool = require('../config/dbConfig');
const Claims = require('../database/claims');

class ClaimsService {
  constructor() {
    this.claims = new Claims();
  }

  postClaim = async (asunto, descripcion, idReclamoTipo, idUsuario) => {
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
  getClaimsByClientId = async ({ idUsuario }) => {
    return await this.claims.getClaimsByClientId(idUsuario);
  };

  patchClaims = async (idUsuario, claimNewStatus, idUser) => {
    return await this.claims.patchClaim(idUsuario, claimNewStatus, idUser);
  };
}
module.exports = ClaimsService;
