const session = require("express-session")
const User = require("../models/user")
const Event = require("../models/event")
const invitationOrganizer = require("../models/info_invitation")

exports.invitation_index_get = async (req, res) => {
  const userId = req.session.user._id
  // reference: https://stackoverflow.com/questions/12821596/multiple-populates-mongoosejs
  const invitations = await invitationOrganizer.find({user_id: userId}).populate("user_id").populate("event_id")
  res.render("invitations/index.ejs", {invitations})
}

exports.invitation_new_get = async (req, res) => {
  // reference https://stackoverflow.com/questions/4299991/how-to-sort-in-mongoose
  const users = await User.find({}).sort('username')
  const currentUser = req.session.user._id
  const allUsers = users.filter((user) => user._id.equals(!currentUser))

  const event = await Event.findById(req.params.eventId)
  res.render("invitations/new.ejs", {allUsers, event})
}

exports.invitation_new_post = async (req, res) => {
  req.body.user_id = req.session.user._id
  await invitationOrganizer.create(req.body)
  res.render("../views/index.ejs")
}

exports.invitation_show_get = async (req, res) => {
  const invitations = await invitationOrganizer.findById(req.params.eventId).populate("event_id").populate("guests")
  res.render("invitations/show.ejs", {invitations})
}

exports.invitation_edit_get = async (req, res) => {
  const invitations = await invitationOrganizer.findById(req.params.invitationId).populate("event_id").populate("guests")
  const users = await User.find({}).sort('username')
  const currentUser = req.session.user._id
  const allUsers = users.filter((user) => user._id.equals(!currentUser))

  res.render("invitations/edit.ejs", {invitations, allUsers})
}

exports.invitation_edit_put = async (req, res) => {
  const invitations = await invitationOrganizer.findById(req.params.invitationId).populate("guests")
  const invitationId = req.params.invitationId
  const newGuests = req.body.guests

  const checkGuest = invitations.guests.some((guest) => {
    return guest._id.equals(newGuests) //if user_id in guests is exit so return true
  })

  if(!checkGuest){
    const updatedGuests = await invitationOrganizer.findByIdAndUpdate(invitationId,
      {$push: {guests: newGuests}}
    )
  }
  res.redirect("/")
}
