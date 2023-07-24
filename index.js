const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const bodyparser = require('body-parser')
const path = require('path')

const app = express()

dotenv.config({path: '.env'})
const PORT = process.env.PORT || 8080

//log requests
app.use(morgan('tiny'))

//parse request to body-parser
app.use(bodyparser.urlencoded({extended: true}))

//set view engine
app.set("view engine", 'ejs')

//load routers
app.use('/', require("./server/routes/pay"))

app.listen(PORT, () => {
    console.log(`Server is Running on http://localhost:${PORT}`)
})