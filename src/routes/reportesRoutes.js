const express = require('express');
const { handleTokenValidity } = require('../controllers/auth');
const { isAdmin } = require('../middlewares/authorization');

const { param } = require('express-validator');
const { validarCampos } = require('../middlewares/validarcampos');
const validateReportFormat = require('../validations/validateReportFormat');
const ReportesController = require('../controllers/reportesController');
const router = express.Router();
router.use(handleTokenValidity);
router.use(isAdmin);
const reportesController = new ReportesController();
router.get(
  '/:formatoReporte/:idReclamoTipo',
  [
    param('formatoReporte')
      .custom(validateReportFormat)
      .withMessage('error : formatos validos de reporte : pdf , csv'),
    param('idReclamoTipo')
      .isNumeric()
      .withMessage('id tipo de reclamo tiene que ser un numero'),
    validarCampos,
  ],
  reportesController.getReporte
);
module.exports = router;
