const mongoose = require('mongoose')
<<<<<<< HEAD

const userSchema = new mongoose.Schema({
  username:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  image:{
    type: String
  }
},
  {
    timestamps: true
  }
)

const User = mongoose.model("User", userSchema)
=======
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    image: { type: String }
  },
  { timestamps: true }
)
const User = mongoose.model('User', userSchema)

>>>>>>> main
module.exports = User
