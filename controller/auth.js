const User = require("../models/user")
const bcrypt = require("bcrypt")

// View registration page
exports.auth_signup_get = async (req, res) => {
  res.render("auth/sign-up.ejs")
}

exports.auth_signup_post = async (req, res) => {
  // check that the username dose not exist before
  const userInDatabase = await User.findOne({ username: req.body.username })
  if (userInDatabase) {
    return res.send("Username already taken")
  }
  // verify password match and confirmation
  if (req.body.password !== req.body.confirmPassword) {
    return res.send("Password and confirm password must match")
  }
  //Save user image
req.body.picture=req.file.filename

// password encryption
  const hashedPassword = bcrypt.hashSync(req.body.password, 10)
  req.body.password = hashedPassword

  //Create a user in the database
  const user = await User.create(req.body)
  res.send(`Thanks for signing up ${user.username}.<br><a href="/">Home</a>`)
}

// Show the login page
exports.auth_signin_get = async (req, res) => {
  res.render("auth/sign-in.ejs")
}

exports.auth_signin_post = async (req, res) => {
  // Find the user in the database
  const userInDatabase = await User.findOne({ username: req.body.username })
  if (!userInDatabase) {
    return res.send("Login failed. Please try again later..")
  }

  //Verify the password
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

  //Redirect to the home page
  res.redirect("/")
}

exports.auth_signout_get = async (req, res) => {
  req.session.destroy()
  res.redirect("/auth/sign-in")
}
