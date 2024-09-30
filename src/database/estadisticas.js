const pool = require('../config/dbConfig');

exports.getTotalesReclamosEstados = async () => {
  const [output] = await pool.query(
    'CALL totales_reclamos_estados(@descripcion, @cantidad);'
  );

  return output[0];
};
