const tipoReclamosService = require('../services/tipoReclamoService');

exports.createTipoReclamo = async (req, res) => {
  try {
    const id = await tipoReclamosService.createTipoReclamo(req.body);
    res
      .status(200)
      .json({ ok: true, message: `Tipo de reclamo creado con éxito.` });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
};

exports.getTipoReclamosActivos = async (req, res) => {
  try {
    const tiposReclamos = await tipoReclamosService.getTipoReclamosActivos();
    res.status(200).json({ ok: true, data: tiposReclamos });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
};

exports.getTipoReclamos = async (req, res) => {
  try {
    const tiposReclamos = await tipoReclamosService.getTipoReclamos();
    res.status(200).json({ ok: true, data: tiposReclamos });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
};

exports.getTipoReclamoById = async (req, res) => {
  try {
    const tipoReclamo = await tipoReclamosService.getTipoReclamoById(
      req.params.id
    );
    res.status(200).json({ ok: true, data: tipoReclamo });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
};

exports.updateTipoReclamo = async (req, res) => {
  try {
    await tipoReclamosService.updateTipoReclamo(req.params.id, req.body);
    res
      .status(200)
      .json({ ok: true, message: 'Tipo de reclamo actualizado con éxito.' });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
};

exports.deleteTipoReclamo = async (req, res) => {
  try {
    await tipoReclamosService.deleteTipoReclamo(req.params.id);
    res
      .status(200)
      .json({ ok: true, message: 'Tipo de reclamo eliminado con éxito.' });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
};

exports.activarTipoReclamo = async (req, res) => {
  try {
    await tipoReclamosService.activarTipoReclamo(req.params.id);
    res
      .status(200)
      .json({ ok: true, message: 'Tipo de reclamo reactivado con éxito.' });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
};
