const pool = require('../config/dbConfig');

const Usuario = {
  createUsuario: async (data) => {
    const { nombre, apellido, correoElectronico, contrasenia, idTipoUsuario } =
      data;
    const query = `
      INSERT INTO usuarios (nombre, apellido, correoElectronico, contrasenia, idTipoUsuario, activo) 
      VALUES (?, ?, ?,sha2( ?,256), ?, 1)
    `;
    const [result] = await pool.execute(query, [
      nombre,
      apellido,
      correoElectronico,
      contrasenia,
      idTipoUsuario,
    ]);
    return result.insertId;
  },

  getUsuarios: async (idTipoUsuario) => {
    const query = `SELECT idUsuario, nombre, apellido, correoElectronico, idTipoUsuario, imagen, activo FROM usuarios WHERE idTipoUsuario = ?`;
    const [result] = await pool.execute(query, [idTipoUsuario]);
    return result;
  },

  getUsuarioById: async (id, idTipo) => {
    const params = [id];
    let query = `SELECT u.idUsuario, u.nombre, u.apellido, u.correoElectronico, 
    u.idTipoUsuario, u.imagen, u.activo, ut.descripcion
    FROM usuarios u 
    JOIN usuariostipo ut
    ON u.idTipoUsuario = ut.idUsuarioTipo
    WHERE u.idUsuario = ?`;
    if (idTipo) {
      query += ' AND u.idTipoUsuario = ?';
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
      AND idTipoUsuario = ?
    `;
    await pool.execute(query, [nombre, apellido, id, idTipo]);
  },

  deleteUsuario: async (id, idTipo) => {
    const query = ` UPDATE usuarios SET activo = 0 WHERE idUsuario = ? AND idTipoUsuario = ? `;
    await pool.execute(query, [id, idTipo]);
  },

  existeUsuario: async (id, idTipo) => {
    const query = `SELECT 1
    FROM usuarios
    WHERE idUsuario = ?
    AND idTipoUsuario = ?`;
    const [result] = await pool.execute(query, [id, idTipo]);
    return result.length > 0;
  },
};

module.exports = Usuario;
