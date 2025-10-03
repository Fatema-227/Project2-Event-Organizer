const User = require("../models/user")
const bcrypt = require("bcrypt")

exports.auth_signup_get = async (req, res) => {
  res.render("auth/sign-up.ejs")
}

exports.auth_signup_post = async (req, res) => {
  const userInDatabase = await User.findOne({ username: req.body.username })
  if (userInDatabase) {
    return res.send("Username already taken")
  }
  if (req.body.password !== req.body.confirmPassword) {
    return res.send("Password and confirm password must match")
  }

  const hashedPassword = bcrypt.hashSync(req.body.password, 10)
  req.body.password = hashedPassword

  const user = await User.create(req.body)
  res.send(`Thanks for signing up ${user.username}`)
}

exports.auth_signin_get = async (req, res) => {
  res.render("auth/sign-in.ejs")
}

exports.auth_signin_post = async (req, res) => {
  const userInDatabase = await User.findOne({ username: req.body.username })
  if (!userInDatabase) {
    return res.send("Login failed. Please try again later..")
  }

  const validPassword = bcrypt.compareSync(
    req.body.password,
    userInDatabase.password
  )
  if (!validPassword) {
    return res.send("Login failed. Please try again later..")
  }

  req.session.user = {
    username: userInDatabase.username,
    _id: userInDatabase._id,
  }

  res.render("index.ejs", {user:req.session.user})
}

exports.auth_signout_get = async (req, res) => {
  req.session.destroy()
  res.redirect("/auth/sign-in")
}
exports.auth_updatePassword_get=async(req,res)=>{
  const user = await User.findById(req.params.id)
  res.render("/auth/update-password",{user})
}
exports.updatePassword = async (req, res) => {
  const user = await User.findById(req.params.id)
  const isMatch = bcrypt.compareSync(req.body.oldPassword, user.password)
  if (!isMatch) {
    return res.send("Old password is incorrect")
  }

  const hashedNewPassword = bcrypt.hashSync(req.body.newPassword)
  user.password = hashedNewPassword
  await user.save()

  res.send("Password updated successfully")
}
