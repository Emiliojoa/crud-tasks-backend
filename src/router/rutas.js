const {Router} = require('express')
const {obtenerId, agregar, obtener, actualizar, eliminar}= require('../controllers/controladores')

const router = Router()

router.get('/tasks', obtener)
router.post('/tasks', agregar)
router.put('/tasks/:id',actualizar)
router.delete('/tasks/:id',eliminar)
router.get('/tasks/:id', obtenerId)

module.exports = router
