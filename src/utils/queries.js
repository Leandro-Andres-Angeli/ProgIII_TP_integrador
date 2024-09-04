const handleUpdateClaimQuery = (userId, claimId, claimStatus) => {
  fechaFinalizado = moment().format('YYYY-MM-DD hh:mm:ss');
  console.log(fechaFinalizado);

  return claimStatus == 4
    ? `UPDATE reclamos set  idReclamoEstado = ${claimStatus} , fechaFinalizado = CURRENT_DATE()  ,idUsuarioFinalizador = ${userId}  WHERE idReclamo = ${claimId} `
    : `UPDATE reclamos set  idReclamoEstado = ${claimStatus} WHERE idReclamo = ${claimId}`;
};
