
// src/libs/pdfkit.js
const PDFDocument = require('pdfkit'); // Usa require en lugar de import

function buildPDF(dataCallback, endCallback) {
  const doc = new PDFDocument();

  doc.on('data', dataCallback);
  doc.on('end', endCallback);

  doc.fontSize(25).text('Some title from PDF Kit');
  doc.end();
}

module.exports = { buildPDF }; // Usa module.exports en lugar de export
