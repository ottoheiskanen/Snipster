const path = require('path')
const express = require('express')
const hbs = require('hbs')
require('./db/mongoose.js')

const snipperRouter = require('./routers/snipper.js')

const app = express()
const port = process.env.PORT || 3000

const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../views')

app.set('view engine', 'hbs')
app.set('views', viewsPath)

app.use(express.static(publicDirPath))
app.use(express.json())
app.use(snipperRouter)

app.get('', (req, res) => {
    res.render('index', {

    })
})

app.listen(port, () => {
    console.log('server is up on port ' + port)
})









