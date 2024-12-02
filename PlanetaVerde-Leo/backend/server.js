const express = require('express')
const cors = require('cors')
const doadorRoutes = require('./routes/doadorRoutes.js')
const app =express()

app.use(cors())
app.use(express.json())

app.use('/doador',doadorRoutes)

app.listen(3000, ()=>console.log('Servidor rodando na porta 3000'))