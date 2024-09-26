const express = require('express');
const router = express.Router();

/* const claimController = require('../controllers/claimController'); */

const ClaimController = require('../controllers/claimController');
const {
  patchClaimsValidActions,
} = require('../validations/validActionsAccordingUserType');

const claimController = new ClaimController();

router.post('/claim', claimController.postClaim);
router.get('/claims', claimController.getClaims);
router.patch('/claims', patchClaimsValidActions, claimController.patchClaims);

module.exports = router;
