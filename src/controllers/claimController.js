const pool = require('../config/dbConfig');
const ClaimsService = require('../services/claimService');
const ClaimStatusService = require('../services/claimStatusService');

const usuarioService = require('../services/usuarioService');
const { sendEmail } = require('../utils/sendEmail');

class ClaimController {
  constructor() {
    this.service = new ClaimsService();
    this.usuarioService = usuarioService;
    this.claimsStatusService = new ClaimStatusService();
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
  getClientClaim = async (req, res) => {
    const { reclamoId } = req.params;
    const { idUsuario } = req.user;
    const [claim] = await this.service.getClaim(reclamoId, idUsuario);

    if (!claim) {
      return res
        .status(404)
        .json({ ok: true, message: 'no se encontro reclamo' });
    }

    return res.status(200).json({ ok: true, res: claim });
  };
  patchClientClaim = async (req, res) => {
    const { idReclamo } = req.params;
    const { idUsuario } = req.user;
    const reclamoNuevoStatus = Number(req.body.reclamoNuevoStatus);
    if (reclamoNuevoStatus !== 3) {
      return res.status(403).json({ ok: false, message: 'No está autorizado' });
    }
    const [existsClaim] = await this.service.getClaim(idReclamo, idUsuario);
    if (existsClaim.length === 0) {
      return res.status(404).json({ ok: true, message: 'No existe reclamo' });
    }
    const [patchClaim] = await this.service.patchClaimClient(
      idReclamo,
      idUsuario,
      reclamoNuevoStatus
    );
    const { nombre, apellido, correoElectronico } =
      await this.usuarioService.getUsuarioById(idUsuario, 3);

    sendEmail({
      name: nombre + ' ' + apellido,
      correoElectronico,
      status: 'cancelado',
    });
    if (patchClaim.affectedRows !== 1) {
      return res
        .status(500)
        .json({ ok: false, message: 'error actualizando reclamo' });
    }

    return res
      .status(200)
      .json({ ok: true, message: `reclamo ${idReclamo} cancelado` });
    /* const existsClaim = this.service.getClaim(); */
  };
  postClientClaim = async (req, res) => {
    try {
      const { asunto, descripcion, idReclamoTipo } = req.body;
      const { idUsuario: idUsuarioCreador } = req.user;
      const newClaim = await this.service.postClaim(
        asunto,
        descripcion,
        idReclamoTipo,
        idUsuarioCreador
      );
      if (newClaim.affectedRows !== 1) {
        return res
          .status(500)
          .json({ ok: false, message: 'error de servidor' });
      }

      return res.status(200).json({
        ok: true,
        message: `reclamo con id ${newClaim.insertId} creado por usuario ${idUsuarioCreador}`,
      });
    } catch (error) {
      return res.status(500).json({ ok: false, message: 'error de servidor' });
    }
  };

  getUserClaims = async (req, res) => {
    try {
      const user = req.user;

      const { idUsuario } = user;
      const queryResult = await this.service.getUserClaims(idUsuario);
      if (queryResult.length === 0) {
        return res
          .status(404)
          .json({ ok: true, message: 'No hay reclamos para este usuario' });
      }

      return res.status(200).json({ ok: true, claims: queryResult });
    } catch (error) {
      return res.status(500).json({ ok: false, message: 'error de servidor' });
    }
  };
  getClaimsEmployee = async (req, res) => {
    try {
      const { idUsuario } = req.user;
      const [claimsEmployeeOffice] = await this.service.getClaimsEmployee(
        idUsuario
      );
      if (claimsEmployeeOffice.length === 0) {
        return res.status(404).json({
          ok: true,
          message:
            'No se encontraron reclamos para la oficina de este empleado',
        });
      }

      return res.status(200).json({ ok: true, res: claimsEmployeeOffice });
    } catch (error) {
      return res.status(500).json({ ok: false, message: 'error de servidor' });
    }
  };
  patchClaimEmployee = async (req, res) => {
    const { idReclamo } = req.params;
    const reclamoNuevoStatus = Number(req.body.reclamoNuevoStatus);
    const { idUsuario } = req.user;

    const [checkRightClaim] = await pool.execute(
      'SELECT * FROM reclamos r where r.idReclamoTipo =  (SELECT uo.idOficina FROM `usuarios` u  JOIN usuarios_oficinas uo ON u.idUsuario = uo.idUsuario WHERE u.idUsuario=?)  AND r.idReclamo = ? ;',
      [idUsuario, idReclamo]
    );

    if (checkRightClaim.length === 0) {
      return res.status(403).json({
        ok: false,
        message: 'Solo puede modificar reclamos que pertenezcan a su oficina',
      });
    }

    if (checkRightClaim[0].idReclamoEstado === reclamoNuevoStatus) {
      return res
        .status(400)
        .json({ ok: false, message: 'El reclamo ya tiene ese estado' });
    }

    const [patchClaim] = await this.service.patchClaimEmployee(
      idReclamo,
      idUsuario,
      reclamoNuevoStatus
    );

    if (!patchClaim.changedRows) {
      return res
        .status(500)
        .json({ ok: false, message: 'error actualizando reclamo' });
    }
    const [getUserType] = await pool.execute(
      `SELECT idUsuarioTipo FROM usuarios WHERE idUsuario = ?`,
      [checkRightClaim[0].idUsuarioCreador]
    );

    const { nombre, apellido, correoElectronico } =
      await this.usuarioService.getUsuarioById(
        checkRightClaim[0].idUsuarioCreador,
        getUserType[0].idUsuarioTipo
      );
    /*   const [newStatus] = await pool.execute(
      'SELECT descripcion FROM reclamos_estado WHERE idReclamoEstado = ? ',
      [reclamoNuevoStatus]
    ); */
    const [claimBynewStatus] =
      await this.claimsStatusService.getClaimStatusByIdStatus(
        reclamoNuevoStatus
      );

    sendEmail({
      name: nombre + ' ' + apellido,
      correoElectronico,

      status: claimBynewStatus.descripcion,
    });
    return res
      .status(200)
      .json({ ok: true, message: 'reclamo modificado con exito' });
  };

  getClaimsAdmin = async (req, res) => {
    try {
      const [claims] = await this.service.getClaimsAdmin();

      return res.status(200).json({ ok: true, res: claims });
    } catch (error) {
      return res.status(500).json({ ok: false, message: 'Error de servidor' });
    }
  };

  patchClaimsAdmin = async (req, res) => {
    const { body } = req;
    const { reclamoId } = req.params;
    const { idUsuario } = req.user;

    const [checkClaimExists] = await pool.execute(
      `SELECT * FROM reclamos WHERE idReclamo  = ?`,
      [reclamoId]
    );

    if (checkClaimExists.length === 0) {
      return res
        .status(404)
        .json({ ok: true, message: 'No se encontro reclamo' });
    }

    if (
      checkClaimExists[0].idReclamoEstado === Number(body.reclamoNuevoStatus)
    ) {
      return res
        .status(400)
        .json({ ok: false, message: 'El reclamo ya tiene ese estado' });
    }
    const [patchResult] = await this.service.patchClaimAdmin(
      body,
      reclamoId,
      idUsuario
    );
    if (patchResult.affectedRows !== 1) {
      return res
        .status(500)
        .json({ ok: false, message: 'Error actualizando reclamo' });
    }
    const [userClaim] = await pool.execute(
      'SELECT nombre , apellido, correoElectronico FROM usuarios WHERE idUsuario = ?',
      [checkClaimExists[0].idUsuarioCreador]
    );
    const [newStatus] = await pool.execute(
      'SELECT descripcion FROM reclamos_estado WHERE idReclamoEstado = ? ',
      [body.reclamoNuevoStatus]
    );
    const { nombre, apellido, correoElectronico } = userClaim[0];
    sendEmail({
      name: nombre + ' ' + apellido,
      correoElectronico,
      status: newStatus[0].descripcion,
    });

    return res.status(200).json({
      ok: true,
      message: `Reclamo número ${reclamoId} modificado por admin número ${idUsuario}`,
    });
  };
  postClaimAdmin = async (req, res) => {
    try {
      const { body } = req;

      const { idUsuario } = req.params;

      const [dbUser] = await pool.execute(
        'SELECT * FROM usuarios WHERE idUsuario = ?',
        [idUsuario]
      );

      if (dbUser.length === 0) {
        return res
          .status(404)
          .json({ ok: true, message: 'No se encontró usuario con ese id' });
      }
      const postClaim = await this.service.postClaimAdmin({
        ...body,
        idUsuario,
      });

      if (postClaim[0].affectedRows !== 1) {
        return res
          .status(500)
          .json({ ok: 'false', message: 'error agregando reclamo' });
      }
      return res.status(200).json({
        ok: true,
        message: `Reclamo número  modificado por admin número`,
      });
    } catch (error) {
      return res.status(500).json({ ok: false, message: 'Error de servidor' });
    }
  };
}

module.exports = ClaimController;
