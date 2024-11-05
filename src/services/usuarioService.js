const Usuario = require('../database/usuario');
const fileUtils = require('../utils/fileUtils');

const checkExisteUsuarioActivo = async (id, idTipo) => {
  const usuario = await Usuario.existeUsuarioActivo(id, idTipo);
  if (!usuario) {
    throw new Error('Usuario no encontrado.');
  }
};

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
    await checkExisteUsuarioActivo(id, idTipo);
    await Usuario.updateUsuario(id, data, idTipo);
  },

  getImagenUsuario: async (id, idTipo) => {
    await checkExisteUsuarioActivo(id, idTipo);
    const imagen = await Usuario.getImagenUsuario(id, idTipo);
    return imagen;
  },

  updateImagenUsuario: async (id, imagen, idTipo) => {
    await checkExisteUsuarioActivo(id, idTipo);
    const usuario = await Usuario.getUsuarioById(id, idTipo);
    await Usuario.updateImagenUsuario(id, imagen, idTipo);
    await fileUtils.deleteImagenDelServidor(usuario.imagen);
  },

  deleteImagenUsuario: async (id, idTipo) => {
    await checkExisteUsuarioActivo(id, idTipo);
    const usuario = await Usuario.getUsuarioById(id, idTipo);
    if (usuario.imagen) {
      await Usuario.deleteImagenUsuario(id, idTipo);
      await fileUtils.deleteImagenDelServidor(usuario.imagen);
    } else {
      throw new Error('El usuario no tiene foto de perfil.');
    }
  },

  updateCorreo: async (id, data, idTipo) => {
    await checkExisteUsuarioActivo(id, idTipo);
    await checkNoExisteCorreo(data.correoElectronico);
    await Usuario.updateCorreoUsuario(id, data, idTipo);
  },

  updateContrasenia: async (id, data, idTipo) => {
    await checkExisteUsuarioActivo(id, idTipo);
    await Usuario.updateContraseniaUsuario(id, data, idTipo);
  },

  deleteUsuario: async (id, idTipo) => {
    await checkExisteUsuarioActivo(id, idTipo);
    await Usuario.deleteUsuario(id, idTipo);
  },

  reactivarUsuario: async (id, idTipo) => {
    await checkExisteUsuario(id, idTipo);
    await Usuario.reactivarUsuario(id, idTipo);
  },
  checkExisteUsuarioActivo,
  checkExisteUsuario,
};

module.exports = usuarioService;
