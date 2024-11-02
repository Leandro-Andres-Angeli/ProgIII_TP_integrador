const pool = require('../config/dbConfig');
const Claims = require('../database/claims');
const { sendEmail } = require('../utils/sendEmail');

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
  getClaimByClaimIdAndUserId = async (idUsuario, idReclamo) => {
    return await this.claims.getClaimByClaimIdAndUserId(idUsuario, idReclamo);
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
  getClaimById = async (claimId) => {
    return await this.claims.getClaimById(claimId);
  };
  getClaimByClaimId = async (claimId) => {
    return await this.claims.getClaimByClaimId(claimId);
  };
  getClaimsByClientId = async ({ idUsuario }) => {
    return await this.claims.getClaimsByClientId(idUsuario);
  };
  patchClaimClient = async (claimId, userId, claimNewStatus, userData) => {
    sendEmail(userData);
    return await this.claims.patchClaimClient(claimId, userId, claimNewStatus);
  };
  getClaimsEmployee = async (idUsuario) => {
    return await this.claims.getClaimsEmployee(idUsuario);
  };
  patchClaimEmployee = async (claimId, userId, claimNewStatus, userData) => {
    sendEmail(userData);
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
  patchClaimAdmin = async (
    body,
    reclamoId,
    idUsuario,
    userData,
    isClaimUpdated
  ) => {
    if (isClaimUpdated) {
      sendEmail(userData);
    }

    return await this.claims.patchClaimAdmin(body, reclamoId, idUsuario);
  };
  postClaimAdmin = async ({ ...data }) => {
    return await this.claims.postClaimAdmin(data);
  };
  //ADMIN SERVICES
  //PAGINACION SERVICES
  getClaimsAdminPagination = async (pagina) => {
    console.log('admin service');
    const queryRes = await this.claims.claimsAdminPaginated(pagina);
    return {
      prev: pagina !== 0,

      next: queryRes.length > 5,
      data: queryRes.slice(0, -1),
    };
  };
  getClaimsEmpleadoPagination = async () => {
    console.log('empleado service');
  };
  getClaimsClientePagination = async () => {
    console.log('cliente service');
  };

  //PAGINACION SERVICES
}
module.exports = ClaimsService;
