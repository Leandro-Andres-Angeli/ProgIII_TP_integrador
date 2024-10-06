const pool = require('../config/dbConfig');

const Usuario = {
  createUsuario: async (data) => {
    const { nombre, apellido, correoElectronico, contrasenia, idUsuarioTipo } =
      data;
    const query = `
      INSERT INTO usuarios (nombre, apellido, correoElectronico, contrasenia, idUsuarioTipo, activo) 
      VALUES (?, ?, ?,sha2( ?,256), ?, 1)
    `;
    const [result] = await pool.execute(query, [
      nombre,
      apellido,
      correoElectronico,
      contrasenia,
      idUsuarioTipo,
    ]);
    return result.insertId;
  },

  getUsuarios: async (idUsuarioTipo) => {
    const query = `SELECT idUsuario, nombre, apellido, correoElectronico, idUsuarioTipo, imagen, activo FROM usuarios WHERE idUsuarioTipo = ?`;
    const [result] = await pool.execute(query, [idUsuarioTipo]);
    return result;
  },

  getUsuarioById: async (id, idTipo) => {
    const params = [id];
    let query = `SELECT u.idUsuario, u.nombre, u.apellido, 
    u.correoElectronico, u.idUsuarioTipo, u.imagen, u.activo
    FROM usuarios u 
    WHERE u.idUsuario = ?`;
    if (idTipo) {
      query += ' AND u.idUsuarioTipo = ?';
      params.push(idTipo);
    }
    const [result] = await pool.execute(query, params);
    return result[0];
  },

  updateUsuario: async (id, data, idTipo) => {
    const { nombre, apellido } = data;

    const query = `
      UPDATE usuarios 
      SET nombre = ?, apellido = ?
      WHERE idUsuario = ?
      AND idUsuarioTipo = ?
    `;
    await pool.execute(query, [nombre, apellido, id, idTipo]);
  },

  deleteUsuario: async (id, idTipo) => {
    const query = ` UPDATE usuarios SET activo = 0 WHERE idUsuario = ? AND idUsuarioTipo = ? `;
    await pool.execute(query, [id, idTipo]);
  },

  existeUsuario: async (id, idTipo) => {
    const query = `SELECT 1
    FROM usuarios
    WHERE idUsuario = ?
    AND idUsuarioTipo = ?
    AND activo = 1`;
    const [result] = await pool.execute(query, [id, idTipo]);
    return result.length > 0;
  },
};

module.exports = Usuario;
