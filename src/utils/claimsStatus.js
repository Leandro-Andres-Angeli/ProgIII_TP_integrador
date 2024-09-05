const claimTypes = Object.freeze({
  1: function (...args) {
    console.log(...args);
    const [userId, claimId, claimStatus] = args;
    return true;
  },
  2: function (...args) {
    /* console.log(...args); */
    /* const [userId, claimId, claimStatus] = args; */
    return true;
  },
  3: function (...args) {
    /*   console.log(...args); */
    /*  const [userId, claimId, claimStatus] = args; */

    return `UPDATE reclamos SET fechaCancelado = CURRENT_DATE()  , idReclamoEstado = ?, idUsuarioFinalizador =? WHERE idReclamo = ?`;
  },
  4: function (...args) {
    /* console.log(args);
    const [userId, claimId, claimStatus] = args; */
    return `UPDATE reclamos SET fechaFinalizado = CURRENT_DATE()  , idReclamoEstado =?, idUsuarioFinalizador = ? WHERE idReclamo = ?`;
  },
});
module.exports = claimTypes;
