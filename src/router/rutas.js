const {Router} = require('express')
const {obtenerId, agregar}= require('../controllers/controladores')

const router = Router()

router.post('/tasks', agregar)
router.get('/tasks/:id', obtenerId)

module.exports = router
