const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate');
const router = Router();

router.post(
  '/',
  [
    check('name', 'campo nombre requerido').notEmpty(),
    check('email', 'campo email requerido').notEmpty(),
    check('email', 'ingrese un email valido').isEmail(),

    validateFields,
  ],
  (req, res) => {
    try {
      const { name, password } = req.body;
      return res.status(403).json({ message: 'usuario creado' });
    } catch (err) {
      return res.status(500).json({ message: 'error de servidor' });
    }
  }
);
module.exports = router;
