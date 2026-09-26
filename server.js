const express = require('express');
const cors = require('cors');
const path = require('path');
const logger = require('./src/middleware/logger');
const rutasIncidentes = require('./src/routes/incidentes.routes');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname)); // Sirve HTML, CSS y JS

// 1. Middleware transversal
app.use(logger);

// 2. Rutas
app.use('/api/incidentes', rutasIncidentes);

// 3. Manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ data: null, error: 'Error interno del servidor.' });
});

app.listen(PORT, () => {
  console.log(`Servidor SOC modular ejecutándose en http://localhost:${PORT}`);
});