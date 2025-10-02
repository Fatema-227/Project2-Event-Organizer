const session = require("express-session")
const User = require("../models/user")
const bcrypt = require("bcrypt")

exports.user_profile_get = async (req, res) => {
  const user = await User.findById(req.params.userId)
  res.render("user/profile.ejs", { user })
}
exports.user_edit_get = async (req, res) => {
  const user = await User.findById(req.params.userId)
  res.render("user/edit.ejs", { user })
}
exports.user_update_put = async (req, res) => {
  const user = await User.findById(req.params.userId)
  const userInDatabase = await User.findOne({ email: req.body.email })
  if (userInDatabase && req.body.email !== user.email) {
    return res.send("Email already used, back to <a href='/'>Home</a>")
  }
  if (req.body.password !== user.password) {
    if (req.body.password !== req.body.confirmPassword) {
      return res.send("Password and confirm password must match.")
    }
    // Password Encrypting
    const hashedPassword = bcrypt.hashSync(req.body.password, 10)
    // means 10 is: encrypt for 10 times, can use between 5 to 10
    req.body.password = hashedPassword
  }
  await user.updateOne(req.body)
  res.redirect("/")
}
