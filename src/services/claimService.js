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
  getClaims = async (user) => {
    const { idUsuarioTipo, idUsuario } = user;
    return await this.claims.getClaims(idUsuarioTipo, idUsuario);
  };
  getClaimsByClientId = async ({ idUsuario }) => {
    return await this.claims.getClaimsByClientId(idUsuario);
  };

  patchClaims = async (body, idUser) => {
    return await this.claims.patchClaim(body, idUser);
  };
}
module.exports = ClaimsService;
