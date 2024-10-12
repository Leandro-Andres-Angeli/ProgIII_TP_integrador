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
  getUserClaims = async (idUsuario) => {
    return await this.claims.getUserClaims(idUsuario);
  };
  getClaims = async (user) => {
    const { idUsuarioTipo, idUsuario } = user;
    return await this.claims.getClaims(idUsuarioTipo, idUsuario);
  };
  getClaim = async (claimId, userId) => {
    return await this.claims.getClaimById(claimId, userId);
  };
  getClaimsByClientId = async ({ idUsuario }) => {
    return await this.claims.getClaimsByClientId(idUsuario);
  };
  patchClaimClient = async (claimId, userId, claimNewStatus) => {
    const patchClaimClient = await this.claims.patchClaimClient(
      claimId,
      userId,
      claimNewStatus
    );
    return patchClaimClient;
  };
  patchClaimEmployee = async (claimId, userId, claimNewStatus) => {
    const patchClaim = await this.claims.patchClaimEmployee(
      claimId,
      userId,
      claimNewStatus
    );
    return patchClaim;
  };

  patchClaims = async (body, user) => {
    return await this.claims.patchClaim(body, user);
  };
}
module.exports = ClaimsService;
