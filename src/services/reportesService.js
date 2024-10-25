const pool = require('../config/dbConfig');
const blobStream = require('blob-stream');

const PDFDocument = require('pdfkit-table');
const formatDate = (date) =>
  new Intl.DateTimeFormat('es').format(new Date(date));
class ReportesService {
  constructor() {}

  generateReportePdf = async () => {
    try {
      const reclamoId = 1;
      let doc = new PDFDocument({ margin: 30, size: 'A4' });
      const [reclamos] = await pool.query(
        'SELECT r.idReclamo,r.asunto,r.descripcion,r.fechaCreado,r.fechaFinalizado,r.fechaCancelado,re.descripcion AS descripcionEstado,r.idReclamoTipo,r.idUsuarioCreador,r.idUsuarioFinalizador FROM reclamos r  join   reclamos_estado re  on r.idReclamoEstado = re.idReclamoEstado WHERE idReclamoTipo = ?',

        [reclamoId]
      );
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

      if (!reclamos || reclamos.length === 0) {
        /* return res.status(404).json({message:'reclamo no encontrado'}) */
        throw Error('Reclamo no encontrado');
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
      console.log(error.message);

      /*  res.status(500).send('Error al generar el PDF'); */
      /* throw Error('Error al generar el PDF'); */
      return [null, error.message || 'Erro al generar PDF'];
    }
  };
  /*   generateReportePdf = async () => {
    try {
      const reclamoId = 1;
      let doc = new PDFDocument({ margin: 30, size: 'A4' });
      const [reclamos] = await pool.query(
        'SELECT r.idReclamo,r.asunto,r.descripcion,r.fechaCreado,r.fechaFinalizado,r.fechaCancelado,re.descripcion AS descripcionEstado,r.idReclamoTipo,r.idUsuarioCreador,r.idUsuarioFinalizador FROM reclamos r  join   reclamos_estado re  on r.idReclamoEstado = re.idReclamoEstado WHERE idReclamoTipo = ?',

        [reclamoId]
      );
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

      if (!reclamos || reclamos.length === 0) {
        return res.status(404).send('Reclamo no encontrado');
      }
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

      await doc.table(table);

      const stream = doc.pipe(blobStream());
      doc.end();
      return stream;
      // return await doc.table(table);
      //   doc.pipe(res);
      // doc.end();

      // done!

      // const pdfBuffer = await generarPDF(reclamo[0]);
    } catch (error) {
      console.log(error.message);

        // res.status(500).send('Error al generar el PDF'); 
      throw Error('Error al generar el PDF');
    }
  }; */
  /*   generateReportePdf() {
    console.log('reporte en pdf');
  } */
  generateReporteCsv() {
    console.log('reporte en csv');
  }
}
module.exports = ReportesService;
