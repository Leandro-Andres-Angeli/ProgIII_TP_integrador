const Usuario = require('../database/usuario');

const usuarioService = {
  getUsuarios: async () => {
    const usuarios = await Usuario.getUsuarios();
    return usuarios;
  },

  createUsuario: async (data) => {
    const id = await Usuario.createUsuario(data);
    return id;
  },

  getUsuarioById: async (id) => {
    const usuario = await Usuario.getUsuarioById(id);
    if (!usuario) {
      throw new Error('Usuario no encontrado.');
    }
    return usuario;
  },

  updateUsuario: async (id, data) => {
    await Usuario.updateUsuario(id, data);
  },

  deleteUsuario: async (id) => {
    await Usuario.deleteUsuario(id);
  },
};

module.exports = usuarioService;
