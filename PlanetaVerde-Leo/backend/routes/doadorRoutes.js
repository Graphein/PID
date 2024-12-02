const express = require('express')
const doadorController  = require('../controller/DoadorController.js')
const router = express.Router();

router.post('/',doadorController.inserir);
router.get('/',doadorController.buscarPorFiltro)
router.get('/:id',doadorController.buscarPorId)
router.delete('/:id',doadorController.deletar)
router.put('/:id',doadorController.atualizar)

module.exports = router;