const Oficina = require('../database/oficina');
const { checkExisteUsuarioActivo } = require('../services/usuarioService');

const oficinaService = {
  createOficina: async (data) => {
    const id = await Oficina.createOficina(data);
    return id;
  },

  getOficinas: async () => {
    const oficinas = await Oficina.getOficinas();
    return oficinas;
  },

  getOficinaById: async (id) => {
    const oficina = await Oficina.getOficinaById(id);
    if (!oficina) {
      throw new Error('Oficina no encontrada.');
    }
    return oficina;
  },

  updateOficina: async (id, data) => {
    await checkExisteOficinaActiva(id);
    await Oficina.updateOficina(id, data);
  },

  deleteOficina: async (id) => {
    await checkExisteOficinaActiva(id);
    await Oficina.deleteOficina(id);
  },

  reactivarOficina: async (id) => {
    await checkExisteOficina(id);
    await Oficina.reactivarOficina(id);
  },

  asignarEmpleado: async (idOficina, idEmpleado) => {
    await checkExisteOficinaActiva(idOficina);
    await checkExisteUsuarioActivo(idEmpleado, 2);
    await checkNoExisteOficinaEmpleado(idOficina, idEmpleado);
    await Oficina.asignarEmpleado(idOficina, idEmpleado);
  },

  asignarEmpleados: async (idOficina, idsEmpleados) => {
    await checkExisteOficinaActiva(idOficina);

    const promise = idsEmpleados.map(async (idEmpleado) => {
      await checkExisteUsuarioActivo(idEmpleado, 2);
      await checkNoExisteOficinaEmpleado(idOficina, idEmpleado);
    });
    await Promise.all(promise);
    await Oficina.asignarEmpleados(idOficina, idsEmpleados);
  },

  getEmpleados: async (id) => {
    await checkExisteOficinaActiva(id);
    const empleados = await Oficina.getEmpleados(id);
    return empleados;
  },
};

const checkExisteOficinaActiva = async (id) => {
  const oficina = await Oficina.existeOficinaActiva(id);
  if (!oficina) {
    throw new Error('Oficina no encontrada.');
  }
};

const checkExisteOficina = async (id) => {
  const oficina = await Oficina.existeOficina(id);
  if (!oficina) {
    throw new Error('Oficina no encontrada.');
  }
};

const checkNoExisteOficinaEmpleado = async (idOficina, idEmpleado) => {
  const oficinaEmpleado = await Oficina.existeOficinaEmpleado(
    idOficina,
    idEmpleado
  );
  if (oficinaEmpleado) {
    throw new Error(`Empleado ya asignado a esa oficina.`);
  }
};

module.exports = oficinaService;
