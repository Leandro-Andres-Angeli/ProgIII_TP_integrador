const usuarioService = require('../services/usuarioService');
const path = require('path');
exports.createCliente = async (req, res) => {
  try {
    let usuario = req.body;
    usuario.idUsuarioTipo = 3; // cliente
    const id = await usuarioService.createUsuario(usuario);
    res.status(200).json({ ok: true, message: `Usuario creado con éxito.` });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
};

exports.getClientes = async (req, res) => {
  try {
    const usuarios = await usuarioService.getUsuarios(3);
    res.status(200).json({ ok: true, data: usuarios });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
};

exports.getPerfilCliente = async (req, res) => {
  try {
    const usuario = await usuarioService.getUsuarioById(req.user.idUsuario, 3);
    res.status(200).json({ ok: true, data: usuario });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
};

exports.getClienteById = async (req, res) => {
  try {
    const usuario = await usuarioService.getUsuarioById(req.params.id, 3);
    res.status(200).json({ ok: true, data: usuario });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
};

exports.updateCliente = async (req, res) => {
  const clienteID = req.user.idUsuario;
  try {
    await usuarioService.updateUsuario(clienteID, req.body, 3);
    res
      .status(200)
      .json({ ok: true, message: 'Perfil actualizado con éxito.' });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
};

exports.updateImagenCliente = async (req, res) => {
  console.log('req.file', req.file);
  try {
    if (req.fileValidationError) {
      return res
        .status(400)
        .json({ ok: false, message: req.fileValidationError });
    }
    if (!req.file) {
      return res
        .status(400)
        .json({ ok: false, message: 'No se ha subido ninguna imagen.' });
    }

    const rutaImagen = req.savedFilePath;
    const clienteID = req.user.idUsuario;

    await usuarioService.updateImagenUsuario(clienteID, rutaImagen, 3);

    res
      .status(200)
      .json({ ok: true, message: 'Foto de perfil actualizada con éxito.' });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
};

exports.getImagenCliente = async (req, res) => {
  const clienteID = req.user.idUsuario;
  try {
    const rutaImagen = await usuarioService.getImagenUsuario(clienteID, 3);
    if (!rutaImagen) {
      return res
        .status(404)
        .json({ ok: false, message: 'Imagen no encontrada' });
    }
    res
      .status(200)
      .sendFile(path.join('src/public/imagenes', rutaImagen), { root: '.' });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
};

exports.deleteImagenCliente = async (req, res) => {
  const clienteID = req.user.idUsuario;
  try {
    await usuarioService.deleteImagenUsuario(clienteID, 3);
    res
      .status(200)
      .json({ ok: true, message: 'Foto de perfil eliminada con éxito.' });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
};

exports.getImagenClienteById = async (req, res) => {
  const clienteID = req.params.id;
  try {
    const rutaImagen = await usuarioService.getImagenUsuario(clienteID, 3);
    if (!rutaImagen) {
      return res
        .status(404)
        .json({ ok: false, message: 'Imagen no encontrada' });
    }
    res
      .status(200)
      .sendFile(path.join('src/public/imagenes', rutaImagen), { root: '.' });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
};
exports.updateCorreoCliente = async (req, res) => {
  const clienteID = req.user.idUsuario;
  try {
    await usuarioService.updateCorreo(clienteID, req.body, 3);
    res.status(200).json({
      ok: true,
      message:
        'Correo electrónico actualizado con éxito. Debe volver a loguearse.',
    });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
};

exports.updateContraseniaCliente = async (req, res) => {
  const clienteID = req.user.idUsuario;
  try {
    await usuarioService.updateContrasenia(clienteID, req.body, 3);
    res.status(200).json({
      ok: true,
      message: 'Contraseña actualizada con éxito. Debe volver a loguearse.',
    });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
};
