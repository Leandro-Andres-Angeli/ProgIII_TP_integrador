const Usuario = require('../database/usuario');

const checkExisteUsuario = async (id, idTipo) => {
  const usuario = await Usuario.existeUsuario(id, idTipo);
  if (!usuario) {
    throw new Error('Usuario no encontrado.');
  }
};

const usuarioService = {
  createUsuario: async (data) => {
    const id = await Usuario.createUsuario(data);
    return id;
  },

  getUsuarios: async (idTipo) => {
    const usuarios = await Usuario.getUsuarios(idTipo);
    return usuarios;
  },

  getUsuarioById: async (id, idTipo) => {
    const usuario = await Usuario.getUsuarioById(id, idTipo);
    if (!usuario) {
      throw new Error('Usuario no encontrado.');
    }
    return usuario;
  },

  updateUsuario: async (id, data, idTipo) => {
    await checkExisteUsuario(id, idTipo);
    await Usuario.updateUsuario(id, data, idTipo);
  },

  deleteUsuario: async (id, idTipo) => {
    await checkExisteUsuario(id, idTipo);
    await Usuario.deleteUsuario(id, idTipo);
  },
  checkExisteUsuario,
};

module.exports = usuarioService;
