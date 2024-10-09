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
const patchClaimsQueriesAdminHelper = function (claimNewStatus, userId) {
  const queries = {
    1: ` UPDATE reclamos SET fechaFinalizado=NULL , fechaCancelado=NULL , idUsuarioFinalizador=NULL ,descripcion =  IFNULL(?,descripcion) , asunto  = IFNULL(?,asunto) , idReclamoEstado =? WHERE idReclamo = ?`,

    2: ` UPDATE reclamos SET fechaFinalizado=NULL , fechaCancelado=NULL , idUsuarioFinalizador=NULL ,descripcion =  IFNULL(?,descripcion) , asunto =  IFNULL(?,asunto) , idReclamoEstado =? WHERE idReclamo = ?`,

    3: ` UPDATE reclamos SET fechaFinalizado=NULL , fechaCancelado=NOW() , idUsuarioFinalizador=IFNULL(${userId},NULL) ,descripcion =  IFNULL(?,descripcion) , asunto =  IFNULL(?,asunto) , idReclamoEstado =? WHERE idReclamo = ?`,

    4: ` UPDATE reclamos SET fechaFinalizado=NOW() , fechaCancelado=NULL , idUsuarioFinalizador=IFNULL(${userId},NULL) ,descripcion =  IFNULL(?,descripcion) , asunto  = IFNULL(?,asunto) , idReclamoEstado =? WHERE idReclamo = ?`,
  };

  return queries[claimNewStatus];
};
exports.patchClaimsQueryAccordingUserType = Object.freeze({
  1: function (bodyData) {
    const { claimId, user } = bodyData;
    const claimNewStatus = Number(bodyData.claimNewStatus);

    const userId = Number(user.idUsuario);
    return {
      query: patchClaimsQueriesAdminHelper(claimNewStatus, userId),
      args: [
        bodyData?.descripcion,
        bodyData?.asunto,
        bodyData?.claimNewStatus,
        bodyData.claimId,
      ],
    };
    /*   return {
      query: `UPDATE reclamos r SET r.idReclamoEstado=?  ${
        (claimNewStatus === 3 &&
          ',fechaCancelado=NOW() , fechaFinalizado=NULL') ||
        ''
      } ${
        (claimNewStatus === 4 &&
          ',fechaFinalizado=NOW() , fechaCancelado=NULL') ||
        ''
      } 
       ${
         claimNewStatus === 1 || claimNewStatus === 2
           ? ',fechaFinalizado=NULL , fechaCancelado=NULL , idUsuarioFinalizador=NULL'
           : ''
       } 
      , descripcion = IFNULL(?,descripcion) , asunto = IFNULL(?,asunto) WHERE r.idReclamo=? ;`,
      args: [claimNewStatus, bodyData?.descripcion, bodyData?.asunto, claimId],
    }; */
  },
  2: function (bodyData) {
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
