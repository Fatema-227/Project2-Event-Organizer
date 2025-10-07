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

exports.user_profile_get = async (req, res) => {
  res.render("auth/profile.ejs")
}

exports.user_profile_post = async (req, res) => {
  if (req.file) {
    req.body.picture = `/uploads/${req.file.filename}`
  }

  await User.findByIdAndUpdate(req.params.userId, req.body)

  req.session.user.profileImg = req.body.picture;
  res.redirect(`/user/${req.params.userId}/profile`)
}


// exports.create_post = async (req, res) => {
//   req.body.owner = req.session.user._id;
//   req.body.images = []
//   if (req.files["images"]) {
//     req.files["images"].forEach((file) => {
//       req.body.images.push(file.path)
//     })
//   }
//   await user.create(req.body)
//   res.redirect("/user/"+ req.session.user._id)
// }

// exports.user_update_put=async(req,res)=>{
//   const user=await User.findById(req.params.userId)

//   if (req.files){
//       user.picture=req.file.path
//   }
//   await user.save()
//   res.redirect("/users/" + user._id)
// }
