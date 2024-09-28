const service = require('../services/usuarioService');

const isAdmin = async (req, res, next) => {
  const usuario = await service.getUsuarioById(req.body.user.idUsuario);
  if (usuario.descripcion != 'admin') {
    return res.status(403).send({
      ok: false,
      error: 'No está autorizado.',
    });
  }
  next();
};

const isClient = async (req, res, next) => {
  const usuario = await service.getUsuarioById(req.body.user.idUsuario);
  if (usuario.descripcion != 'cliente') {
    return res.status(403).send({
      ok: false,
      error: 'No está autorizado.',
    });
  }
  req.user = usuario.idUsuario;
  next();
};

module.exports = { isAdmin, isClient };
