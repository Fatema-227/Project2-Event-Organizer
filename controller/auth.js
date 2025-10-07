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
req.body.picture=req.file.filename
  const hashedPassword = bcrypt.hashSync(req.body.password, 10)
  req.body.password = hashedPassword

  const user = await User.create(req.body)
  res.send(`Thanks for signing up ${user.username}.<br><a href="/">Home</a>`)
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

  res.redirect("/")
}

exports.auth_signout_get = async (req, res) => {
  req.session.destroy()
  res.redirect("/auth/sign-in")
}
