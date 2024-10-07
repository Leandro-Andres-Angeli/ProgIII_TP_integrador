// routes/pdfRoutes.js
const express = require('express');
const router = express.Router();
const pool = require('../config/dbConfig');
const PDFDocument = require('pdfkit-table');
/* const { generarPDF } = require('../libs/pdfkit'); */
const formatDate = (date) =>
  new Intl.DateTimeFormat('es').format(new Date(date));
router.get('/reclamo/:id/pdf', async (req, res) => {
  try {
    const reclamoId = req.params.id;
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
    doc.pipe(res);
    doc.end();

    // done!

    // const pdfBuffer = await generarPDF(reclamo[0]);
  } catch (error) {
    console.error('Error al generar el PDF:', error);
    res.status(500).send('Error al generar el PDF');
  }
});

module.exports = router;
