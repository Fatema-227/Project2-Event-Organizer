const multer = require("multer")
const path=require("path")

const upload = multer({dest:"public/uploads"})


module.exports = upload
