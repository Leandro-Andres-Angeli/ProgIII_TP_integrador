const service = require('../services/usuarioService');

const isAdmin = async (req, res, next) => {
  const usuario = req.user;
  console.log(usuario);

  if (usuario.idUsuarioTipo !== 1) {
    return res.status(403).send({
      ok: false,
      error: 'No está autorizado.',
    });
  }
  req.user = { idUsuario: usuario.idUsuario };
  next();
};

const isClient = async (req, res, next) => {
  const usuario = req.user;
  if (usuario.idUsuarioTipo !== 3) {
    return res.status(403).send({
      ok: false,
      error: 'No está autorizado.',
    });
  }
  req.user = { idUsuario: usuario.idUsuario };
  next();
};

const isEmpleado = async (req, res, next) => {
  const usuario = req.user;
  if (usuario.idUsuarioTipo !== 2) {
    return res.status(403).send({
      ok: false,
      error: 'No está autorizado.',
    });
  }
  req.user = { idUsuario: usuario.idUsuario };
  next();
};

module.exports = { isAdmin, isClient };
