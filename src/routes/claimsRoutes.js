const express = require('express');
const router = express.Router();

/* const claimController = require('../controllers/claimController'); */

const ClaimController = require('../controllers/claimController');
const {
  patchClaimsValidActions,
} = require('../validations/validActionsAccordingUserType');
const { handleTokenValidity } = require('../controllers/auth');

const claimController = new ClaimController();

router.post('/reclamo', handleTokenValidity, claimController.postClaim);
router.get('/reclamos', handleTokenValidity, claimController.getClaims);
router.patch(
  '/reclamos',
  handleTokenValidity,
  patchClaimsValidActions,
  claimController.patchClaims
);

module.exports = router;
