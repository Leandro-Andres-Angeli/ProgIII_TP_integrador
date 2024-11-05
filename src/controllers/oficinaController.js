const oficinaService = require('../services/oficinaService');

exports.createOficina = async (req, res) => {
  try {
    const id = await oficinaService.createOficina(req.body);
    res.status(200).json({ ok: true, message: `Oficina creada con éxito.` });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
};

exports.getOficinas = async (req, res) => {
  try {
    const oficinas = await oficinaService.getOficinas();
    res.status(200).json({ ok: true, data: oficinas });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
};

exports.getOficinaById = async (req, res) => {
  try {
    const oficina = await oficinaService.getOficinaById(req.params.id);
    res.status(200).json({ ok: true, data: oficina });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
};

exports.updateOficina = async (req, res) => {
  try {
    await oficinaService.updateOficina(req.params.id, req.body);
    res
      .status(200)
      .json({ ok: true, message: 'Oficina actualizada con éxito.' });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
};

exports.deleteOficina = async (req, res) => {
  try {
    await oficinaService.deleteOficina(req.params.id);
    res.status(200).json({ ok: true, message: 'Oficina eliminada con éxito.' });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
};

exports.reactivarOficina = async (req, res) => {
  try {
    await oficinaService.reactivarOficina(req.params.id);
    res
      .status(200)
      .json({ ok: true, message: 'Oficina reactivada con éxito.' });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
};

exports.asignarEmpleados = async (req, res) => {
  try {
    await oficinaService.asignarEmpleados(
      req.body.idOficina,
      req.body.idsEmpleados
    );
    res.status(200).json({
      ok: true,
      message: 'Empleado/s asignado/s a la oficina con éxito.',
    });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
};

exports.desvincularEmpleados = async (req, res) => {
  try {
    await oficinaService.desvincularEmpleados(
      req.body.idOficina,
      req.body.idsEmpleados
    );
    res.status(200).json({
      ok: true,
      message: 'Empleado/s desvinculado/s a la oficina con éxito.',
    });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
};

exports.getEmpleados = async (req, res) => {
  try {
    const empleados = await oficinaService.getEmpleados(req.params.id);
    res.status(200).json({ ok: true, data: empleados });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
};
