const express = require('express');
const router = express.Router();
const { listar, crear, eliminar } = require('../controllers/incidentes.controller');

router.get('/', listar);
router.post('/', crear);
router.delete('/:id', eliminar);

module.exports = router;