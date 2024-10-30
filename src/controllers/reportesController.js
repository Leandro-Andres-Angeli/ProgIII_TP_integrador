const { response } = require('express');
const path = require('path');
const fs = require('fs');
const handlebars = require('handlebars');
const ReportesService = require('../services/reportesService');
const puppeteer = require('puppeteer');

class ReportesController {
  constructor() {
    this.reportesService = new ReportesService();
  }
  getInforme = async (req, res = response) => {
    try {
      const { formatoReporte } = req.params;
      if (formatoReporte === 'pdf') {
        const { headers, buffer } =
          await this.reportesService.generateReportePdfPupeteer();
        res.set(headers);
        res.status(200).end(buffer);
      } else if (formatoReporte === 'csv') {
        const { path, header } =
          await this.reportesService.generateCsvArchivo();

        res.set(header);
        res.status(200).download(path);
      }
    } catch (error) {
      return res
        .status(500)
        .json({ ok: false, message: error.message || 'error de servidor' });
    }
  };
  /*  getInforme = async (req, res = response) => {
    try {
      const informe = await this.reportesService.generateReportePdfPupeteer();
      console.log(informe);

      const filePath = path.join(__dirname, '../utils/reporte.html');
      const htmlTemplate = fs.readFileSync(filePath, 'utf-8');
      const template = handlebars.compile(htmlTemplate);
      const htmlFinal = template(informe);
      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();

      await page.setContent(htmlFinal, { waitUntil: 'load' });
      await page.emulateMediaType('screen');
      const pdf = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: { top: '10px', bottom: '10px' },
      });
      await browser.close();
      const headers = {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline;filename="reporte.pdf"',
      };
      res.set(headers);
      res.status(200).end(pdf);
    } catch (error) {
      console.log(error);

      return res.status(500).json({ ok: false, message: 'error de servidor' });
    }
  }; */
  getReporte = async (req, res = response) => {
    try {
      const { formatoReporte, idReclamoTipo } = req.params;

      const parseFormat = `${formatoReporte[0].toUpperCase()}${formatoReporte.slice(
        1
      )}`;

      //Llamar dinamicamente metodo
      const [reporteResult, error] = await this.reportesService[
        `generateReporte${parseFormat}`
      ](idReclamoTipo);
      if (!reporteResult || reporteResult.length === 0) {
        return res.status(404).json({ ok: true, error });
      }
      // console.log(reporteResult);

      //Llamar dinamicamente metodo
      return res
        .status(200)
        .setHeader('Content-Type', `application/${formatoReporte}`)
        .setHeader(
          'Content-Disposition',
          `attachment;filename=reporte.${formatoReporte}`
        )
        .send(reporteResult);
    } catch (error) {
      return res
        .status(500)
        .json({ ok: false, message: error.message || 'error de servidor' });
    }
  };
}
module.exports = ReportesController;
