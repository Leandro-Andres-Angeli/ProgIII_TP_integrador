const express = require('express');
const router = express.Router();

const ClaimController = require('../controllers/claimController');

const { handleTokenValidity } = require('../controllers/auth');
const {
  isClient,
  isEmpleado,
  isAdmin,
} = require('../middleware/authorization');
const { check, param } = require('express-validator');
const { validarCampos } = require('../middleware/validarcampos');

const claimController = new ClaimController();
router.use(handleTokenValidity);
///CLIENTE ROUTES
router.get(
  '/clientes/',
  isClient,

  claimController.getUserClaims
);
router.get(
  '/clientes/:reclamoId',
  isClient,
  [
    param('reclamoId').isNumeric().withMessage('parametro debe ser un numero'),
    validarCampos,
  ],
  claimController.getClientClaim
);
router.post(
  '/clientes/',
  isClient,
  [
    check('asunto', 'campo asunto no puede estar vacio').notEmpty(),
    check('descripcion', 'campo descripcion no puede estar vacio').notEmpty(),
    check(
      'idReclamoTipo',
      'campo idTipoReclamo no puede estar vacio'
    ).notEmpty(),
    check(
      'idReclamoTipo',
      'campo idTipoReclamo debe ser un numero'
    ).isNumeric(),
    validarCampos,
  ],
  claimController.postClientClaim
);
router.patch(
  '/clientes/:idReclamo',
  isClient,
  [
    check('idReclamo', 'campo idReclamo debe ser un numero').isNumeric(),
    check('reclamoNuevoStatus')
      .notEmpty()
      .withMessage('campo reclamoNuevoStatus no puede estar vacio')
      .isNumeric()
      .withMessage('campo reclamoNuevoStatus debe ser un numero'),

    validarCampos,
  ],
  claimController.patchClientClaim
);
///CLIENTE ROUTES

///EMPLEADO ROUTES
router.get(
  '/empleados/',
  isEmpleado,

  claimController.getClaimsEmployee
);

router.patch(
  '/empleados/:idReclamo',
  isEmpleado,

  [
    check('idReclamo', 'campo idReclamo debe ser un numero').isNumeric(),
    check('reclamoNuevoStatus')
      .notEmpty()
      .withMessage('campo reclamoNuevoStatus no puede estar vacio')
      .isNumeric()
      .withMessage('campo reclamoNuevoStatus debe ser un numero'),

    validarCampos,
  ],

  claimController.patchClaimEmployee
);
///EMPLEADO ROUTES

///ADMIN ROUTES
router.get(
  '/admin/',
  isAdmin,

  claimController.getClaimsAdmin
);
router.patch(
  '/admin/:reclamoId',
  [
    param('reclamoId').isNumeric().withMessage('parametro debe ser un numero'),
    check('reclamoNuevoStatus')
      .notEmpty()
      .withMessage('campo reclamoNuevoStatus no puede estar vacio')
      .isNumeric()
      .withMessage('campo reclamoNuevoStatus debe ser un numero'),
    validarCampos,
  ],
  isAdmin,

  claimController.patchClaimsAdmin
);
router.post(
  '/admin/:idUsuario/',
  [
    param('idUsuario').isNumeric().withMessage('parametro debe ser un numero'),
    check('idReclamoEstado')
      .notEmpty()
      .withMessage('campo idReclamoEstado no puede estar vacio')
      .isNumeric()
      .withMessage('campo idReclamoEstado debe ser un numero'),
    check('asunto').notEmpty().withMessage('asunto no puede estar vacio'),
    check('descripcion')
      .notEmpty()
      .withMessage('descripcion no puede estar vacio'),
    validarCampos,
  ],
  isAdmin,

  claimController.postClaimAdmin
);
///ADMIN ROUTES

module.exports = router;
