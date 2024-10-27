const usuarioService = require('../services/usuarioService');

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

exports.updateEmpleado = async (req, res) => {
  try {
    await usuarioService.updateUsuario(req.params.id, req.body, 2);
    res
      .status(200)
      .json({ ok: true, message: 'Empleado actualizado con éxito.' });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
};

exports.updateCorreoEmpleado = async (req, res) => {
  try {
    await usuarioService.updateCorreo(req.params.id, req.body, 2);
    res
      .status(200)
      .json({
        ok: true,
        message:
          'Correo electrónico actualizado con éxito. Debe volver a loguearse.',
      });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
};

exports.updateContraseniaEmpleado = async (req, res) => {
  try {
    await usuarioService.updateContrasenia(req.params.id, req.body, 2);
    res
      .status(200)
      .json({
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
