const path = require('path');
const fs = require('fs');
const handlebars = require('handlebars');
const PDFDocument = require('pdfkit-table');
const { createObjectCsvStringifier } = require('csv-writer');
const formatDate = require('../utils/formatDate');
const Claims = require('../database/claims');
const { default: puppeteer } = require('puppeteer');

class ReportesService {
  constructor() {
    this.claims = new Claims();
  }
  generateReportePdfPupeteer = async () => {
    const informe = await this.claims.reportesClaimProcedure();
    /* const filePath = path.join(__dirname, '../utils/reporte.html');
    const htmlTemplate = fs.readFileSync(filePath, 'utf-8');
    const template = handlebars.compile(htmlTemplate);
    const htmlFinal = template();

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(htmlFinal, { waitUntil: 'load' });
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '10px', bottom: '10px' },
    });
    await browser.close();
    return pdfBuffer; */
    return informe;
  };
  generateReportePdf = async (idReclamoTipo) => {
    try {
      let doc = new PDFDocument({ margin: 30, size: 'A4' });

      const reclamos = await this.claims.reportesClaimQuery(idReclamoTipo);
      const reclamosValues = reclamos.reduce((acc, curr) => {
        acc.push(
          Object.values(curr).map((val) => {
            let objectValue = val;
            if (val instanceof Date) {
              objectValue = formatDate(val);
            }
            if (!val) {
              objectValue = 'N/A';
            }
            return objectValue;
          })
        );
        return acc;
      }, []);

      if (reclamos.length === 0) {
        return [null, 'No existen reclamos de este tipo'];
      }
      const pdfBuffer = await new Promise((resolve, reject) => {
        const buffers = [];
        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', () => resolve(Buffer.concat(buffers)));
        doc.on('error', reject);
        const table = {
          title: 'Listado reclamos',

          headers: [
            'id',
            'asunto',
            'descripcion',
            'fecha creado',
            'fecha finalizado',
            'fecha cancelado',
            'reclamo estado',
            'reclamo tipo',
            'usuario creador',
            'usuario finalizador',
          ],
          rows: reclamosValues,
        };
        doc.table(table);
        doc.end();
      });
      return [pdfBuffer, null];
    } catch (error) {
      return [null, error.message || 'Error al generar PDF'];
    }
  };

  generateReporteCsv = async (idReclamoTipo) => {
    try {
      const reclamos = await this.claims.reportesClaimQuery(idReclamoTipo);
      if (reclamos.length === 0) {
        return [null, 'No existen reclamos de este tipo'];
      }
      const csvStringifier = createObjectCsvStringifier({
        header: [
          { id: 'id', title: 'id' },
          { id: 'asunto', title: 'asunto' },
          { id: 'descripcion', title: 'descripcion' },
          { id: 'fecha creado', title: 'fecha creado' },
          { id: 'fecha finalizado', title: 'fecha finalizado' },
          { id: 'fecha cancelado', title: 'fecha cancelado' },
          { id: 'reclamo estado', title: 'reclamo estado' },
          { id: 'reclamo tipo', title: 'reclamo tipo' },
          { id: 'usuario creador', title: 'usuario creador' },
          { id: 'usuario finalizador', title: 'usuario finalizador' },
        ],
      });
      const csvString =
        csvStringifier.getHeaderString() +
        csvStringifier.stringifyRecords(reclamos);
      return [csvString, null];
    } catch (error) {
      return [null, error.message || 'Error al generar CSV'];
    }
  };
}
module.exports = ReportesService;
