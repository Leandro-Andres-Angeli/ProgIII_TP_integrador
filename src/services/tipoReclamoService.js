const TipoReclamos = require('../database/tipoReclamo');

const tipoReclamosService = {
  createTipoReclamo: async (data) => {
    const id = await TipoReclamos.createTipoReclamo(data);
    return id;
  },

  getTipoReclamosActivos: async () => {
    const tipoReclamos = await TipoReclamos.getTipoReclamosActivos();
    return tipoReclamos;
  },

  getTipoReclamos: async () => {
    const tipoReclamos = await TipoReclamos.getTipoReclamos();
    return tipoReclamos;
  },

  getTipoReclamoById: async (id) => {
    const tipoReclamos = await TipoReclamos.getTipoReclamoById(id);
    if (!tipoReclamos) {
      throw new Error('Tipo de reclamo no encontrado');
    }
    return tipoReclamos;
  },

  updateTipoReclamo: async (id, data) => {
    await checkExisteTipoReclamoActivo(id);
    await TipoReclamos.updateTipoReclamo(id, data);
  },

  deleteTipoReclamo: async (id) => {
    await checkExisteTipoReclamoActivo(id);
    await TipoReclamos.modificarEstadoTipoReclamo(0, id);
  },

  activarTipoReclamo: async (id) => {
    await checkExisteTipoReclamo(id);
    await TipoReclamos.modificarEstadoTipoReclamo(1, id);
  },
};

const checkExisteTipoReclamoActivo = async (id) => {
  const tipoReclamos = await TipoReclamos.existeTipoReclamoActivo(id);
  if (!tipoReclamos) {
    throw new Error('Tipo de reclamo no encontrado.');
  }
};

const checkExisteTipoReclamo = async (id) => {
  const tipoReclamos = await TipoReclamos.existeTipoReclamo(id);
  if (!tipoReclamos) {
    throw new Error('Tipo de reclamo no encontrado.');
  }
};

module.exports = tipoReclamosService;
