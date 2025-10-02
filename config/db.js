const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on("connected", () => {
  console.log(`connected to the MongoDB ${mongoose.connection.name}`)
})

// to import to the server.js, without this can not import
module.exports = mongoose
