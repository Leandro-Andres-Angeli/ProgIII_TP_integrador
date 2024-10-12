const express = require('express');
const router = express.Router();

/* const claimController = require('../controllers/claimController'); */

const ClaimController = require('../controllers/claimController');
const {
  patchClaimsValidActions,
} = require('../validations/validActionsAccordingUserType');
const { handleTokenValidity } = require('../controllers/auth');
const { isClient } = require('../middleware/authorization');

const claimController = new ClaimController();
router.use(handleTokenValidity);
router.get('/clientes/:reclamoId', isClient, claimController.getClientClaim);
router.post('/clientes/', isClient, claimController.postClientClaim);
/* router.post('/', claimController.postClaim);
router.get('/', claimController.getClaims);
router.patch(
  '/',

  patchClaimsValidActions,
  claimController.patchClaims
);


 */
module.exports = router;
