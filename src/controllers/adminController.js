const usuarioService = require('../services/usuarioService');
const path = require('path');
const fs = require('fs');

exports.getPerfilAdmin = async (req, res) => {
  try {
    const usuario = await usuarioService.getUsuarioById(req.user.idUsuario, 1);
    res.status(200).json({ ok: true, data: usuario });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
};

exports.updateAdmin = async (req, res) => {
  const adminID = req.user.idUsuario;
  try {
    await usuarioService.updateUsuario(adminID, req.body, 1);
    res
      .status(200)
      .json({ ok: true, message: 'Perfil actualizado con éxito.' });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
};

exports.updateImagenAdmin = async (req, res) => {
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
    const adminID = req.user.idUsuario;

    await usuarioService.updateImagenUsuario(adminID, rutaImagen, 1);

    res
      .status(200)
      .json({ ok: true, message: 'Foto de perfil actualizada con éxito.' });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
};

exports.getImagenAdmin = async (req, res) => {
  const adminID = req.user.idUsuario;
  try {
    const rutaImagen = await usuarioService.getImagenUsuario(adminID, 1);
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

exports.deleteImagenAdmin = async (req, res) => {
  const adminID = req.user.idUsuario;
  try {
    await usuarioService.deleteImagenUsuario(adminID, 1);
    res
      .status(200)
      .json({ ok: true, message: 'Foto de perfil eliminada con éxito.' });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
};

exports.updateCorreoAdmin = async (req, res) => {
  const adminID = req.user.idUsuario;
  try {
    await usuarioService.updateCorreo(adminID, req.body, 1);
    res.status(200).json({
      ok: true,
      message:
        'Correo electrónico actualizado con éxito. Debe volver a loguearse.',
    });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
};

exports.updateContraseniaAdmin = async (req, res) => {
  const adminID = req.user.idUsuario;
  try {
    await usuarioService.updateContrasenia(adminID, req.body, 1);
    res.status(200).json({
      ok: true,
      message: 'Contraseña actualizada con éxito. Debe volver a loguearse.',
    });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
};
