exports.getClaimsQueryAccordingUserType = Object.freeze({
  1: function (...args) {
    return { query: 'SELECT * FROM reclamos', args };
  },
  2: function (...args) {
    return {
      query:
        'SELECT r.* from reclamos r  WHERE idReclamoTipo=( SELECT of.idOficina  FROM usuarios_oficinas  of WHERE idUsuario=?);',
      args,
    };
  },
  3: function (...args) {
    return {
      query: 'SELECT r.* from reclamos r  WHERE idUsuarioCreador = ?',
      args,
    };
  },
});
exports.patchClaimsQueryAccordingUserType = Object.freeze({
  1: function (bodyData) {
    return { query: 'SELECT * FROM reclamos', args };
  },
  2: function (bodyData) {
    console.log('in patch claims');

    const { claimNewStatus, claimId } = bodyData;

    return {
      query: `UPDATE reclamos r SET r.idReclamoEstado=?  ${
        (claimNewStatus === 3 && ',fechaCancelado=NOW()') || ''
      } ${
        (claimNewStatus === 4 && ',fechaFinalizado=NOW()') || ''
      }  WHERE r.idReclamo=? ;`,
      args: [claimNewStatus, claimId],
    };
  },
  3: function (bodyData) {
    const {
      claimNewStatus,
      claimId,
      user: { idUsuario },
    } = bodyData;
    return {
      query:
        'UPDATE reclamos r SET r.idReclamoEstado=? , fechaCancelado=NOW() , idUsuarioFinalizador=? WHERE r.idReclamo =? ;',
      args: [claimNewStatus, idUsuario, claimId],
    };
  },
});
