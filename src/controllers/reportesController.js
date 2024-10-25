const { response } = require('express');
const ReportesService = require('../services/reportesService');
class ReportesController {
  constructor() {
    this.reportesService = new ReportesService();
  }
  handleResponseError(res) {
    return res.status(500).json({ ok: false, message: 'error de servidor' });
  }
  getReporte = async (req, res = response) => {
    try {
      const { formatoReporte } = req.params;

      const parseFormat = `${formatoReporte[0].toUpperCase()}${formatoReporte.slice(
        1
      )}`;

      //Llamar dinamicamente metodo
      const [reporteResult, error] = await this.reportesService[
        `generateReporte${parseFormat}`
      ]();
      if (error) {
        throw Error('Error en servicio');
      }
      console.log(reporteResult);

      //Llamar dinamicamente metodo
      return res
        .status(200)
        .setHeader('Content-Type', 'application/pdf')
        .send(reporteResult);
    } catch (error) {
      /* console.log(error); */

      /* return this.handleResponseError(res); */
      return res
        .status(500)
        .json({ ok: false, message: error.message || 'error de servidor' });
    }
  };
}
module.exports = ReportesController;
