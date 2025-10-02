const express = require('express')
const path = require('path')
require('dotenv').config()

const app = express()

const logger = require('morgan')
const methodOverride = require('method-override')
const session = require('express-session')

//Port configuration
const port = process.env.PORT ? process.env.PORT : "3000"


app.listen(port, () => {
    console.log(`The express app is ready on port ${port}`)
  })

