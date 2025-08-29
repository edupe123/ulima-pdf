
// api/index.js
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, '../public')));

// Ruta especial
app.get('/portalUL/tdta/servlets/ComandoMostrarDocumentoTDTA', (req, res) => {
  const nuSoli = req.query.nuSoli;

  if (!nuSoli) {
    return res.status(400).send('Falta el parámetro nuSoli');
  }

  const pdfPath = path.join(__dirname, '../public/pdfs', `${nuSoli}.pdf`);

  if (fs.existsSync(pdfPath)) {
    res.sendFile(pdfPath);
  } else {
    res.status(404).send('PDF no encontrado');
  }
});

// Exportar como función serverless
module.exports = app;
