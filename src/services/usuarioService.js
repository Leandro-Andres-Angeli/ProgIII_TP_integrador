const Usuario = require('../database/usuario');

const checkExisteUsuario = async (id, idTipo) => {
  const usuario = await Usuario.existeUsuario(id, idTipo);
  if (!usuario) {
    throw new Error('Usuario no encontrado.');
  }
};

const checkNoExisteCorreo = async (correoElectronico) => {
  const correoExiste = await Usuario.existeCorreo(correoElectronico);
  if (correoExiste) {
    throw new Error('Ya existe un usuario con ese correo electrónico.');
  }
};

const usuarioService = {
  createUsuario: async (data) => {
    await checkNoExisteCorreo(data.correoElectronico);
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

  updateCorreo: async (id, data, idTipo) => {
    await checkExisteUsuario(id, idTipo);
    await Usuario.updateCorreoUsuario(id, data, idTipo);
  },

  updateContrasenia: async (id, data, idTipo) => {
    await checkExisteUsuario(id, idTipo);
    await Usuario.updateContraseniaUsuario(id, data, idTipo);
  },

  deleteUsuario: async (id, idTipo) => {
    await checkExisteUsuario(id, idTipo);
    await Usuario.deleteUsuario(id, idTipo);
  },
  checkExisteUsuario,
};

module.exports = usuarioService;
