// src/routes/pdfRoutes.js
const express = require('express');
const { buildPDF } = require('../libs/pdfkit.js'); // Importa la función buildPDF

const router = express.Router();

router.get("/invoice", (req, res) => {
 
  const stream = res.writeHead(200, {
    "Content-Type": "application/pdf",
    "Content-Disposition": "attachment; filename=invoice.pdf",
  });

  
  buildPDF(
    (data) => stream.write(data),
    () => stream.end()
  );
});

module.exports = router;
