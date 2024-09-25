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
