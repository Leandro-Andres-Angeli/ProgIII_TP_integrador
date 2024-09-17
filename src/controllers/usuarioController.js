const usuarioService = require('../services/usuarioService');

exports.getUsuarios = async (req, res) => {
  try {
    const usuarios = await usuarioService.getUsuarios();
    res.status(200).json(usuarios);
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
};

exports.getUsuarioById = async (req, res) => {
  try {
    const usuario = await usuarioService.getUsuarioById(req.params.id);
    res.status(200).json(usuario);
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
};

exports.createUsuario = async (req, res) => {
  try {
    const id = await usuarioService.createUsuario(req.body);
    res.status(200).json({ message: `Usuario creado con id: ${id}` });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
};

exports.updateUsuario = async (req, res) => {
  try {
    await usuarioService.updateUsuario(req.params.id, req.body);
    res.status(200).json({ message: 'Usuario actualizado.' });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
};

exports.deleteUsuario = async (req, res) => {
  try {
    await usuarioService.deleteUsuario(req.params.id);
    res.status(200).json({ message: 'Usuario eliminado con éxito.' });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
};
