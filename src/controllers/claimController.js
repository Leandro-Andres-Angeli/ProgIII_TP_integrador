const pool = require('../config/dbConfig');
const ClaimsService = require('../services/claimService');
const { sendEmail } = require('../utils/sendEmail');

class ClaimController {
  constructor() {
    this.service = new ClaimsService();
  }
  postClaim = async (req, res) => {
    try {
      const { asunto, descripcion, idReclamoTipo } = req.body;
      const { idUsuario } = req.user;

      const newClaimQuery = await this.service.postClaim(
        asunto,
        descripcion,
        idReclamoTipo,
        idUsuario
      );

      if (newClaimQuery.affectedRows === 0) {
        return res
          .status(500)
          .json({ ok: false, message: 'Error creando nuevo Reclamo' });
      }

      return res.status(200).json({
        ok: true,
        message: `Reclamo creado con exito por usuario numero ${idUsuario}`,
      });
    } catch (error) {
      return res.status(500).json({ ok: false, message: 'Error de servidor' });
    }
  };

  getClaimsByClientId = async (req, res) => {
    const userId = Number(req.params.userId);
  };

  getClaims = async (req, res) => {
    const user = req.user;

    const queryResult = await this.service.getClaims(user);
    if (queryResult.length === 0) {
      return res
        .status(404)
        .json({ ok: true, message: 'No hay reclamos para este usuario' });
    }
    return res.status(200).json({ ok: true, claims: queryResult });
  };
  patchClaims = async (req, res) => {
    try {
      const user = req.user;

      const { claimId } = req.body;
      const claimNewStatus = Number(req.body.claimNewStatus);

      const patchResult = await this.service.patchClaims(req.body, user);
      if (patchResult?.affectedRows !== 1) {
        throw Error('Error actualizando reclamo');
      }
      const [claimStatusDesc] = await pool.execute(
        'SELECT descripcion FROM `reclamos_estado` rt WHERE rt.idReclamoEstado = ?',
        [claimNewStatus]
      );
      const [correoElectronicoQuery] = await pool.execute(
        `SELECT u.* FROM  reclamos r join usuarios u on  r.idUsuarioCreador  = u.idUsuario where r.idReclamo = ?;`,
        [claimId]
      );
      const { correoElectronico, nombre, apellido } = correoElectronicoQuery[0];

      sendEmail({
        name: nombre + ' ' + apellido,
        correoElectronico,
        status: claimStatusDesc[0].descripcion,
      });
      return res
        .status(200)
        .json({ ok: true, message: 'Reclamo modificado con exito' });
    } catch (error) {
      return res
        .status(500)
        .json({ ok: false, message: error.message || 'Error de servidor' });
    }
  };
}

module.exports = ClaimController;
