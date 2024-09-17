const pool = require('../config/dbConfig');

const Usuario = {
  getUsuarios: async (id) => {
    const query = `SELECT * FROM usuarios`;
    const [result] = await pool.execute(query);
    return result;
  },

  createUsuario: async (data) => {
    const {
      nombre,
      apellido,
      correoElectronico,
      contrasenia,
      idTipoUsuario,
      activo,
    } = data;
    const query = `
      INSERT INTO usuarios (nombre, apellido, correoElectronico, contrasenia, idTipoUsuario, activo) 
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const [result] = await pool.execute(query, [
      nombre,
      apellido,
      correoElectronico,
      contrasenia,
      idTipoUsuario,
      activo,
    ]);
    return result.insertId;
  },

  getUsuarioById: async (id) => {
    const query = `SELECT * FROM usuarios WHERE idUsuario = ?`;
    const [result] = await pool.execute(query, [id]);
    return result[0];
  },

  updateUsuario: async (id, data) => {
    const {
      nombre,
      apellido,
      correoElectronico,
      contrasenia,
      idTipoUsuario,
      activo,
    } = data;

    const query = `
      UPDATE usuarios 
      SET nombre = ?, apellido = ?, correoElectronico = ?, contrasenia = ?, idTipoUsuario = ?, activo = ? 
      WHERE idUsuario = ?
    `;
    await pool.execute(query, [
      nombre,
      apellido,
      correoElectronico,
      contrasenia,
      idTipoUsuario,
      activo,
      id,
    ]);
  },

  deleteUsuario: async (id) => {
    const query = `DELETE FROM usuarios WHERE idUsuario = ?`;
    await pool.execute(query, [id]);
  },
};

module.exports = Usuario;
