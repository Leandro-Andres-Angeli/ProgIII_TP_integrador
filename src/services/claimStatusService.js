const ClaimStatus = require('../database/claimStatus');

class ClaimStatusService {
  constructor() {
    this.claimStatus = new ClaimStatus();
  }
  getClaimStatusByIdStatus = async (idClaimStatus) => {
    return await this.claimStatus.getClaimStatusByIdStatus(idClaimStatus);
  };
}
module.exports = ClaimStatusService;
