const usuarioService = require('../services/usuarioService');
const path = require('path');
const fs = require('fs');

exports.createEmpleado = async (req, res) => {
  try {
    let usuario = req.body;
    usuario.idUsuarioTipo = 2; // empleado
    const id = await usuarioService.createUsuario(usuario);
    res.status(200).json({ ok: true, message: `Empleado creado con éxito.` });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
};

exports.getEmpleados = async (req, res) => {
  try {
    const usuarios = await usuarioService.getUsuarios(2);
    res.status(200).json({ ok: true, data: usuarios });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
};

exports.getEmpleadoById = async (req, res) => {
  try {
    const usuario = await usuarioService.getUsuarioById(req.params.id, 2);
    res.status(200).json({ ok: true, data: usuario });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
};

exports.updateEmpleadoById = async (req, res) => {
  try {
    await usuarioService.updateUsuario(req.params.id, req.body, 2);
    res
      .status(200)
      .json({ ok: true, message: 'Empleado actualizado con éxito.' });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
};

exports.updateCorreoEmpleadoById = async (req, res) => {
  try {
    await usuarioService.updateCorreo(req.params.id, req.body, 2);
    res.status(200).json({
      ok: true,
      message:
        'Correo electrónico actualizado con éxito. Debe volver a loguearse.',
    });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
};

exports.updateContraseniaEmpleadoById = async (req, res) => {
  try {
    await usuarioService.updateContrasenia(req.params.id, req.body, 2);
    res.status(200).json({
      ok: true,
      message: 'Contraseña actualizada con éxito. Debe volver a loguearse.',
    });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
};

exports.deleteEmpleado = async (req, res) => {
  try {
    await usuarioService.deleteUsuario(req.params.id, 2);
    res
      .status(200)
      .json({ ok: true, message: 'Empleado eliminado con éxito.' });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
};

exports.reactivarEmpleado = async (req, res) => {
  try {
    await usuarioService.reactivarUsuario(req.params.id, 2);
    res
      .status(200)
      .json({ ok: true, message: 'Empleado reactivado con éxito.' });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
};

exports.updateImagenEmpleadoById = async (req, res) => {
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
    const empleadoID = req.params.id;

    await usuarioService.updateImagenUsuario(empleadoID, rutaImagen, 2);

    res
      .status(200)
      .json({ ok: true, message: 'Foto de perfil actualizada con éxito.' });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
};

exports.getImagenEmpleadoById = async (req, res) => {
  const empleadoID = req.params.id;
  try {
    const imagen = await usuarioService.getImagenUsuario(empleadoID, 2);
    if (!imagen) {
      return res
        .status(404)
        .json({ ok: false, message: 'Imagen no encontrada' });
    }
    const rutaImagen = path.join('src/public/imagenes', imagen);

    if (fs.existsSync(rutaImagen)) {
      res.status(200).sendFile(rutaImagen, { root: '.' });
    } else {
      res.status(404).json({ ok: false, message: 'Imagen no encontrada' });
    }
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
};

exports.deleteImagenEmpleadoById = async (req, res) => {
  const empleadoID = req.params.id;
  try {
    await usuarioService.deleteImagenUsuario(empleadoID, 2);
    res
      .status(200)
      .json({ ok: true, message: 'Foto de perfil eliminada con éxito.' });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
};
