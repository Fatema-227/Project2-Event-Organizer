// const multer = require("multer")
// const path=require("path")

// const upload = multer({dest:"public/uploads"})


// module.exports = upload
const multer = require("multer")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads")
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage: storage })

module.exports = upload
