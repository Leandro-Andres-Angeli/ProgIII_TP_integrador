const pool = require('../config/dbConfig');

const TipoReclamos = {
  createTipoReclamo: async (data) => {
    const { descripcion } = data;
    const query = `
        INSERT INTO reclamos_tipo (descripcion , activo ) VALUES (?,1)
      `;
    const [result] = await pool.execute(query, [descripcion]);
    return result.insertId;
  },

  getTipoReclamosActivos: async () => {
    const query = `SELECT * FROM reclamos_tipo WHERE activo = 1`;
    const [result] = await pool.execute(query);
    return result;
  },

  getTipoReclamos: async () => {
    const query = `SELECT * FROM reclamos_tipo`;
    const [result] = await pool.execute(query);
    return result;
  },

  getTipoReclamoById: async (id) => {
    const params = [id];
    let query = `SELECT * FROM reclamos_tipo WHERE idReclamoTipo = ?`;
    const [result] = await pool.execute(query, params);
    return result[0];
  },

  updateTipoReclamo: async (id, data) => {
    const params = [data.descripcion, id];
    const query = `UPDATE reclamos_tipo SET descripcion = ? WHERE idReclamoTipo = ?`;
    await pool.execute(query, params);
  },

  modificarEstadoTipoReclamo: async (activo, id) => {
    const params = [activo, id];
    const query = `UPDATE reclamos_tipo SET activo = ? WHERE idReclamoTipo = ?`;
    await pool.execute(query, params);
  },

  existeTipoReclamoActivo: async (id) => {
    const query = `SELECT 1
        FROM reclamos_tipo
        WHERE idReclamoTipo = ?
        AND activo = 1`;
    const [result] = await pool.execute(query, [id]);
    return result.length > 0;
  },

  existeTipoReclamo: async (id) => {
    const query = `SELECT 1
        FROM reclamos_tipo
        WHERE idReclamoTipo = ?`;
    const [result] = await pool.execute(query, [id]);
    return result.length > 0;
  },
};

module.exports = TipoReclamos;
