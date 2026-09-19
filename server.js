// server.js - Capa de Lógica y Servicios (Semana 3)
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Servir los archivos estáticos actuales del front-end
app.use(express.static(__dirname));

const RUTA_DATOS = path.join(__dirname, 'data', 'incidentes.json');

// Función auxiliar para leer incidentes del JSON
function leerIncidentes() {
  const data = fs.readFileSync(RUTA_DATOS, 'utf-8');
  return JSON.parse(data);
}

// 1. Endpoint de salud (requerimiento Semana 3)
app.get('/salud', (req, res) => {
  res.status(200).json({ estado: 'ok', servicio: 'API Incidentes SOC' });
});

// 2. Endpoint para obtener incidentes (GET)
app.get('/api/incidentes', (req, res) => {
  try {
    const incidentes = leerIncidentes();
    res.status(200).json(incidentes);
  } catch (error) {
    res.status(500).json({ error: 'Error al leer el archivo de incidentes' });
  }
});

// 3. Endpoint para registrar un nuevo incidente (POST con validación en servidor)
app.post('/api/incidentes', (req, res) => {
  const { tipo, prioridad, fecha, descripcion } = req.body;

  // Validación en el servidor (Criterio de seguridad: nunca confiar en el cliente)
  if (!tipo || !prioridad || !fecha || !descripcion) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios (*).' });
  }
  if (descripcion.length < 30) {
    return res.status(400).json({ error: 'La descripción debe tener al menos 30 caracteres.' });
  }

  try {
    const incidentes = leerIncidentes();
    const nuevoIncidente = {
      id: `INC-${Date.now().toString().slice(-4)}`,
      tipo,
      prioridad,
      fecha,
      descripcion
    };

    incidentes.unshift(nuevoIncidente);
    fs.writeFileSync(RUTA_DATOS, JSON.stringify(incidentes, null, 2));

    res.status(201).json(nuevoIncidente); // 201 Created
  } catch (error) {
    res.status(500).json({ error: 'No se pudo guardar el incidente en el servidor' });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor SOC corriendo en http://localhost:${PORT}`);
});