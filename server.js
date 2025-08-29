// server.js
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

// 1. Servir archivos estáticos desde /public
app.use(express.static(path.join(__dirname, 'public')));

// 2. Ruta especial que imita la URL larga con ?nuSoli=xxxx
app.get('/portalUL/tdta/servlets/ComandoMostrarDocumentoTDTA', (req, res) => {
  const nuSoli = req.query.nuSoli; // Capturamos ?nuSoli=174453

  if (!nuSoli) {
    return res.status(400).send('Falta el parámetro nuSoli');
  }

  // Ruta del PDF según el parámetro
  const pdfPath = path.join(__dirname, 'public', 'pdfs', `${nuSoli}.pdf`);

  // Validamos que exista el archivo
  if (fs.existsSync(pdfPath)) {
    res.sendFile(pdfPath);
  } else {
    res.status(404).send('PDF no encontrado');
  }
});

// Exportar la app (Vercel se encarga de ejecutarla)
module.exports = app;

