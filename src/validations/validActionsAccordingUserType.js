const pool = require('../config/dbConfig');

const validateSetNewClaimStatus = Object.freeze({
  1: function (_, _, next, _) {
    next();
  },
  2: async function (req, res, next, claimNewStatus) {
    const { claimId } = req.body;
    const user = req.user;
    const { idUsuario } = user;
    const [checkRightClaim] = await pool.execute(
      'SELECT * FROM reclamos r where r.idReclamoTipo =  (SELECT uo.idOficina FROM `usuarios` u  JOIN usuarios_oficinas uo ON u.idUsuario = uo.idUsuario WHERE u.idUsuario=?)  AND r.idReclamo = ? ;',
      [idUsuario, claimId]
    );

    if (checkRightClaim.length === 0) {
      return res.status(404).json({
        ok: true,
        message: 'reclamo no pertenece a su oficina , o no existe',
      });
    }

    next();
  },
  3: async function (req, res, next, claimNewStatus) {
    const { claimId } = req.body;
    const user = req.user;
    if (claimNewStatus !== 3) {
      return res.status(401).json({ ok: false, message: 'no autorizado' });
    }
    const [claim] = await pool.execute(
      'SELECT *  from reclamos WHERE idUsuarioCreador=? AND idReclamo=?;',
      [user.idUsuario, claimId]
    );
    if (!claim.length) {
      return res
        .status(404)
        .json({ ok: true, message: 'No se encontro reclamo' });
    }
    if (claim[0].idReclamoEstado === claimNewStatus) {
      return res.status(400).json({
        ok: true,
        message: `el reclamo ya tiene  estado ${claimNewStatus}`,
      });
    }
    return next();
  },
});

exports.patchClaimsValidActions = (req, res, next) => {
  const user = req.user;
  const claimNewStatus = Number(req.body.claimNewStatus);
  validateSetNewClaimStatus[user.idUsuarioTipo](req, res, next, claimNewStatus);
};
