const userRoles = Object.freeze({
  cliente: 3,
  empleado: 2,
  admin: 1,
});
const userTypes = Object.freeze({
  3: 'cliente',
  2: 'empleado',
  1: 'admin',
});
module.exports = { userRoles, userTypes };
