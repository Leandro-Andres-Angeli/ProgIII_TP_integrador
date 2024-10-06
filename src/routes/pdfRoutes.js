// routes/pdfRoutes.js
const express = require('express');
const router = express.Router();
const pool = require('../config/dbConfig'); 
const { generarPDF } = require('../libs/pdfkit');

router.get('/reclamo/:id/pdf', async (req, res) => {
       try {
        const reclamoId = req.params.id;

        const [reclamo] = await pool.query('SELECT * FROM reclamos WHERE idReclamosTipo = ?', [reclamoId]);

        if (!reclamo || reclamo.length === 0) {
            return res.status(404).send('Reclamo no encontrado');
        }

        const pdfBuffer = await generarPDF(reclamo[0]);

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=reclamo.pdf');
        res.send(pdfBuffer);
    } catch (error) {
        console.error('Error al generar el PDF:', error);
        res.status(500).send('Error al generar el PDF');
    }
});

module.exports = router;