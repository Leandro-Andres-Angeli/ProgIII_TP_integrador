const { Router } = require('express');
const {
  handleTokenValidity,
  passportJWTStrategy,
} = require('../middlewares/auth');
const passport = require('passport');
passport.use(passportJWTStrategy);
const router = Router();

router.get('/', (req, res) => {
  return res.status(200).json({ ok: true, message: 'in get all' });
});
router.post('/', handleTokenValidity, (req, res) => {
  res.status(200).json({ ok: true });
});
module.exports = router;
