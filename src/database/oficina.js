const pool = require('../config/dbConfig');

const Oficina = {
  createOficina: async (data) => {
    const { nombre, idReclamoTipo } = data;
    const query = `
      INSERT INTO oficinas (nombre, idReclamoTipo, activo) 
      VALUES (?, ?, 1)
    `;
    const [result] = await pool.execute(query, [nombre, idReclamoTipo]);
    return result.insertId;
  },

  getOficinas: async () => {
    const query = `SELECT * FROM oficinas`;
    const [result] = await pool.execute(query);
    return result;
  },

  getOficinaById: async (id) => {
    const params = [id];
    let query = `SELECT *
    FROM oficinas
    WHERE idOficina = ?`;
    const [result] = await pool.execute(query, params);
    return result[0];
  },

  updateOficina: async (id, data) => {
    const { nombre, idReclamoTipo } = data;

    const query = `
      UPDATE oficinas 
      SET nombre = ?, idReclamoTipo = ?
      WHERE idOficina = ?
    `;
    await pool.execute(query, [nombre, idReclamoTipo, id]);
  },

  deleteOficina: async (id) => {
    const query = ` UPDATE oficinas SET activo = 0 WHERE idOficina = ? `;
    await pool.execute(query, [id]);
  },

  reactivarOficina: async (id) => {
    const query = ` UPDATE oficinas SET activo = 1 WHERE idOficina = ? `;
    await pool.execute(query, [id]);
  },

  asignarEmpleados: async (idOficina, idsEmpleados) => {
    const connection = await pool.getConnection();
    try {
      connection.beginTransaction();
      const promises = idsEmpleados.map((idEmpleado) => {
        const query = `INSERT INTO usuarios_oficinas (idOficina, idUsuario, activo) 
        VALUES (?, ?, 1)`;
        return connection.query(query, [idOficina, idEmpleado]);
      });
      await Promise.all(promises);
      await connection.commit();
      return true;
    } catch (error) {
      await connection.rollback();
      throw new Error('Ocurrió un error al asignar empleados');
    } finally {
      connection.release();
    }
  },

  desvincularEmpleados: async (idOficina, idsEmpleados) => {
    const connection = await pool.getConnection();
    try {
      connection.beginTransaction();
      const promises = idsEmpleados.map((idEmpleado) => {
        const query = `DELETE FROM usuarios_oficinas WHERE idOficina = ? AND idUsuario = ?`;
        return connection.query(query, [idOficina, idEmpleado]);
      });
      await Promise.all(promises);
      await connection.commit();
      return true;
    } catch (error) {
      await connection.rollback();
      throw new Error('Ocurrió un error al desvincular empleados');
    } finally {
      connection.release();
    }
  },

  getEmpleados: async (id) => {
    const query = `SELECT u.idUsuario, u.nombre, u.apellido, 
    u.correoElectronico, u.idUsuarioTipo, u.imagen, u.activo
    FROM oficinas AS o
    JOIN usuarios_oficinas AS uo
    ON uo.idOficina = o.idOficina
    JOIN usuarios AS u
    ON uo.idUsuario = u.idUsuario
    WHERE o.idOficina = ?
    `;
    const [result] = await pool.execute(query, [id]);
    return result;
  },

  existeOficinaActiva: async (id) => {
    const query = `SELECT 1
    FROM oficinas
    WHERE idOficina = ?
    AND activo = 1`;
    const [result] = await pool.execute(query, [id]);
    return result.length > 0;
  },

  existeOficina: async (id) => {
    const query = `SELECT 1
    FROM oficinas
    WHERE idOficina = ?`;
    const [result] = await pool.execute(query, [id]);
    return result.length > 0;
  },

  existeOficinaEmpleado: async (idOficina, idEmpleado) => {
    const query = `SELECT 1
    FROM usuarios_oficinas
    WHERE idOficina = ?
    AND idUsuario = ?
    AND activo = 1`;
    const [result] = await pool.execute(query, [idOficina, idEmpleado]);
    return result.length > 0;
  },
};

module.exports = Oficina;
