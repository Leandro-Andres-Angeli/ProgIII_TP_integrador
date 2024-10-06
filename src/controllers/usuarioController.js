const usuarioService = require('../services/usuarioService');
const { validateCliente } = require('../validations/usuarioValidator');

// CRUD Clientes

exports.createCliente = [
  validateCliente,
  async(req,res)=>{
  try {
    let usuario = req.body;
    usuario.idUsuarioTipo = 3; // cliente
    const id = await usuarioService.createUsuario(usuario);
    res.status(200).json({ ok: true, message: `Usuario creado con éxito.` });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
}
];

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
  const { nombre, apellido, correoElectronico, contrasenia, idTipoUsuario } = req.body;
  const clienteID = req.user.id;

  try {
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE id = ?', [clienteID]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'No se encuentra al cliente solicitado.' });
    }

    await usuarioService.updateUsuario(clienteID, req.body, idTipoUsuario);

    res.status(200).json({ ok: true, message: 'Perfil actualizado con éxito.' });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
};

// CRUD Empleados

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
