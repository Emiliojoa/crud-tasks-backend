const {Router} = require('express')
const {obtenerId, agregar, obtener}= require('../controllers/controladores')

const router = Router()

router.get('/tasks', obtener)
router.post('/tasks', agregar)
router.get('/tasks/:id', obtenerId)

module.exports = router
