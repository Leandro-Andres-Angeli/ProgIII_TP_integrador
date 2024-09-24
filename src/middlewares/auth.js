const jwt = require('jsonwebtoken');
const service = require('../services/usuarioService');
require('dotenv').config();

const isAdmin = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // El token es enviado utilizando "Bearer"

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, usuario) => {
    if (err) {
      return res
        .status(403)
        .send({ status: 'Fallo', data: { error: 'Token inválido.' } });
    }

    const data = await service.getUsuarioById(usuario.idUsuario);
    if (data.descripcion != 'admin') {
      return res
        .status(403)
        .send({
          status: 'Fallo',
          data: { error: 'No tiene los privilegios necesarios.' },
        });
    }

    next();
  });
};

module.exports = { isAdmin };
