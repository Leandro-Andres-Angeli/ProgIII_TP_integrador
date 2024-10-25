const pool = require('../config/dbConfig');

const PDFDocument = require('pdfkit-table');
const { createObjectCsvStringifier } = require('csv-writer');
const Claims = require('../database/claims');
const formatDate = (date) =>
  new Intl.DateTimeFormat('es').format(new Date(date));
class ReportesService {
  constructor() {
    this.claims = new Claims();
  }

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
      /*  res.status(500).send('Error al generar el PDF'); */
      /* throw Error('Error al generar el PDF'); */
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
