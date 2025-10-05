const session = require("express-session")
const User = require("../models/user")
const Event = require("../models/event")
const invitationOrganizer = require("../models/info_invitation")

exports.invitation_new_get = async (req, res) => {
  // reference https://stackoverflow.com/questions/4299991/how-to-sort-in-mongoose
  const users = await User.find({}).sort('username')
  const currentUser = req.session.user._id
  const allUsers = users.filter((user) => user._id.toString() !== currentUser.toString())

  const event = await Event.findById(req.params.eventId)
  res.render("invitations/new.ejs", {allUsers, event})
}

exports.invitation_new_post = async (req, res) => {
  const infoInvitation = await invitationOrganizer.create(req.body)
  res.render("../views/index.ejs")
}
