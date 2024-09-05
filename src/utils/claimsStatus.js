const claimUpdateQueries = Object.freeze({
  2: function () {
    return `UPDATE reclamos SET fechaCreado = NULL ,  fechaCancelado = NULL  , fechaFinalizado = NULL ,idReclamoEstado = ?, idUsuarioFinalizador =? WHERE idReclamo = ?`;
  },
  3: function () {
    return `UPDATE reclamos SET fechaCancelado = CURRENT_DATE()  , fechaFinalizado = NULL , idReclamoEstado = ? , idUsuarioFinalizador = ? WHERE idReclamo = ?`;
  },
  4: function () {
    return `UPDATE reclamos SET fechaFinalizado = CURRENT_DATE()  , fechaCancelado = NULL  , idReclamoEstado =?, idUsuarioFinalizador = ? WHERE idReclamo = ? `;
  },
});
module.exports = claimUpdateQueries;
