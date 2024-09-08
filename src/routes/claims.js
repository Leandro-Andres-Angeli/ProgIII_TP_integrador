const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
  return res.status(200).json({ ok: true, message: 'in get all' });
});

module.exports = router;
