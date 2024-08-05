const express = require('express')
const cors= require('cors')
const morgan = require('morgan')

const Router = require('./src/router/rutas')

const app = express()

app.use(express.json())

app.use(cors())
app.use(morgan())
app.use(Router)




app.listen(4000,(console.log("servidor andando")))