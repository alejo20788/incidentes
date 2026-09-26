const modelo = require('../models/incidentes.model');

const listar = (req, res) => {
  res.status(200).json({ data: modelo.obtenerTodos(), error: null });
};

const crear = (req, res) => {
  const { tipo, prioridad, fecha, descripcion } = req.body;
  
  if (!tipo || !prioridad || !fecha || !descripcion) {
    return res.status(400).json({ data: null, error: 'Faltan campos obligatorios' });
  }
  
  const nuevo = {
    id: `INC-${Date.now().toString().slice(-4)}`,
    tipo, prioridad, fecha, descripcion
  };
  
  const creado = modelo.crear(nuevo);
  res.status(201).json({ data: creado, error: null });
};

const eliminar = (req, res) => {
  modelo.eliminar(req.params.id);
  res.status(200).json({ data: { message: "Incidente desactivado" }, error: null });
};

module.exports = { listar, crear, eliminar };