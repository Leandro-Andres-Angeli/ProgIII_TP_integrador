<<<<<<< HEAD

// src/libs/pdfkit.js
const PDFDocument = require('pdfkit'); // Usa require en lugar de import

function buildPDF(dataCallback, endCallback) {
  const doc = new PDFDocument();

  doc.on('data', dataCallback);
  doc.on('end', endCallback);

  doc.fontSize(25).text('Some title from PDF Kit');
  doc.end();
}

module.exports = { buildPDF }; 
=======
// src/libs/pdfkit.js
const PDFDocument = require('pdfkit'); 
const pool = require('../config/dbConfig'); 
const generarPDF = async (id) => {
    const doc = new PDFDocument();
    const buffers = [];

    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
        const pdfData = Buffer.concat(buffers);
        return pdfData;
    });

    try {
        doc.fontSize(25).text('Detalles del Reclamo', { align: 'center' });
        doc.moveDown();
        doc.text(`ID Tipo Reclamo: ${reclamo.idReclamosTipo}`);
        doc.text(`Descripción: ${reclamo.descripcion}`);
        doc.text(`Activo: ${reclamo.activo ? 'Sí' : 'No'}`);
        doc.end();

            return new Promise((resolve, reject) => {
            doc.on('end', () => {
                resolve(Buffer.concat(buffers));
            });
            doc.on('error', (error) => {
                reject(error);
            });
        });
    } catch (error) {
        console.error(`Error al generar el PDF: ${error.message}`);
        throw error; 
    }
};

module.exports = generarPDF;
>>>>>>> rama-pdf
