const Usuario = require('../database/usuario');

const usuarioService = {
  createUsuario: async (data) => {
    const id = await Usuario.createUsuario(data);
    return id;
  },

  getUsuarios: async (idTipo) => {
    const usuarios = await Usuario.getUsuarios(idTipo);
    return usuarios;
  },

  getUsuarioById: async (id) => {
    const usuario = await Usuario.getUsuarioById(id);
    if (!usuario) {
      throw new Error('Usuario no encontrado.');
    }
    return usuario;
  },

  getUsuarioById: async (id, idTipo) => {
    const usuario = await Usuario.getUsuarioById(id, idTipo);
    if (!usuario) {
      throw new Error('Usuario no encontrado.');
    }
    return usuario;
  },

  updateUsuario: async (id, data, idTipo) => {
    const usuario = await Usuario.existeUsuario(id, idTipo);
    if (!usuario) {
      throw new Error('Usuario no encontrado.');
    }
    await Usuario.updateUsuario(id, data, idTipo);
  },

  deleteUsuario: async (id, idTipo) => {
    const usuario = await Usuario.existeUsuario(id, idTipo);
    if (!usuario) {
      throw new Error('Usuario no encontrado.');
    }
    await Usuario.deleteUsuario(id, idTipo);
  },
};

module.exports = usuarioService;
