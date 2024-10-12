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
    return await this.claims.patchClaimClient(claimId, userId, claimNewStatus);
  };
  getClaimsEmployee = async (idUsuario) => {
    return await this.claims.getClaimsEmployee(idUsuario);
  };
  patchClaimEmployee = async (claimId, userId, claimNewStatus) => {
    const patchClaim = await this.claims.patchClaimEmployee(
      claimId,
      userId,
      claimNewStatus
    );
    return patchClaim;
  };
  //ADMIN SERVICES
  getClaimsAdmin = async () => {
    return await this.claims.getClaimsAdmin();
  };
  patchClaimAdmin = async (body, reclamoId, idUsuario) => {
    return await this.claims.patchClaimAdmin(body, reclamoId, idUsuario);
  };
  postClaimAdmin = async ({ ...data }) => {
    return await this.claims.postClaimAdmin(data);
  };
  //ADMIN SERVICES
}
module.exports = ClaimsService;
