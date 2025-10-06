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
  }
}

exports.update_password = async (req, res) => {
  console.log("here...")
  const user = await User.findById(req.params.userId)
  if (!user) return res.send("User does not exists!")

  const validatePassword = bcrypt.compareSync(
    req.body.oldPassword,
    user.password
  )
  if (!validatePassword) return res.send("Your Old Password is not correct")
  if (req.body.newPassword != req.body.confirmPassword)
    return res.send("Password and Confirm Password must match")
  const hashedPass = bcrypt.hashSync(req.body.newPassword, 10)
  user.password = hashedPass
  await user.save()

  res.send("password updated")
}
