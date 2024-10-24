const express = require('express');
const { handleTokenValidity } = require('../controllers/auth');
const { isAdmin } = require('../middlewares/authorization');
const router = express.Router();
router.use(handleTokenValidity);
/* router.use(isAdmin); */
router.get('/:formatoReporte', (req, res) => {
  res.send({ ok: true, message: 'reportes route' });
});
module.exports = router;
