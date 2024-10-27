const pool = require('../config/dbConfig');

class ClaimStatus {
  constructor() {}
  getClaimStatusByIdStatus = async (idReclamosStatus) => {
    const [claimsStatus] = await pool.execute(
      'SELECT * FROM reclamos_estado WHERE idReclamoEstado = ? ',
      [idReclamosStatus]
    );
    return claimsStatus;
  };
}
module.exports = ClaimStatus;
