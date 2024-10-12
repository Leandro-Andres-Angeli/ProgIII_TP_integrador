exports.patchClaimsQueriesAdminHelper = function (claimNewStatus, userId) {
  const queries = {
    1: ` UPDATE reclamos SET fechaFinalizado=NULL , fechaCancelado=NULL , idUsuarioFinalizador=NULL ,descripcion =  IFNULL(?,descripcion) , asunto  = IFNULL(?,asunto) , idReclamoEstado =? WHERE idReclamo = ?`,

    2: ` UPDATE reclamos SET fechaFinalizado=NULL , fechaCancelado=NULL , idUsuarioFinalizador=NULL ,descripcion =  IFNULL(?,descripcion) , asunto =  IFNULL(?,asunto) , idReclamoEstado =? WHERE idReclamo = ?`,

    3: ` UPDATE reclamos SET fechaFinalizado=NULL , fechaCancelado=NOW() , idUsuarioFinalizador=IFNULL(${userId},NULL) ,descripcion =  IFNULL(?,descripcion) , asunto =  IFNULL(?,asunto) , idReclamoEstado =? WHERE idReclamo = ?`,

    4: ` UPDATE reclamos SET fechaFinalizado=NOW() , fechaCancelado=NULL , idUsuarioFinalizador=IFNULL(${userId},NULL) ,descripcion =  IFNULL(?,descripcion) , asunto  = IFNULL(?,asunto) , idReclamoEstado =? WHERE idReclamo = ?`,
  };

  return queries[claimNewStatus];
};
