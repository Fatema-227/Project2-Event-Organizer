const session = require("express-session")
const Invitation = require("../models/invitation")
const User = require("../models/user")
const Event = require("../models/event")

exports.invitation_index_get = async (req, res) => {
  // reference https://stackoverflow.com/questions/4299991/how-to-sort-in-mongoose
  const users = await User.find({}).sort('username')
  const currentUser = req.session.user._id

  const allUsers = users.filter((user) => user._id.toString() !== currentUser.toString())
  res.render("invitations/index.ejs", {allUsers})
}
