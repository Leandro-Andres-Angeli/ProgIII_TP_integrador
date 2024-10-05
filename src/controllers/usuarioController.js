const usuarioService = require('../services/usuarioService');
const { validateCliente } = require('../validations/usuarioValidator');

// CRUD Clientes

exports.createCliente = async (req, res) => {
  try {
    let usuario = req.body;
    usuario.idTipoUsuario = 3; // cliente
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
  try {
    await usuarioService.updateUsuario(req.user.idUsuario, req.body, 3);
    res
      .status(200)
      .json({ ok: true, message: 'Perfil actualizado con éxito.' });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
};

// CRUD Empleados

exports.createEmpleado = async (req, res) => {
  try {
    let usuario = req.body;
    usuario.idTipoUsuario = 2; // empleado
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
