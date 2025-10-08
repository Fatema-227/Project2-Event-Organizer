const session = require("express-session")
const User = require("../models/user")
const Event = require("../models/event")
const invitationOrganizer = require("../models/info_invitation")
const invitation = require("../models/invitation")

exports.invitation_index_get = async (req, res) => {
  const userId = req.session.user._id
  // reference: https://stackoverflow.com/questions/12821596/multiple-populates-mongoosejs
  const invitations = await invitationOrganizer.find({}).populate("event_id").populate("guests")
  res.render("invitations/index.ejs", { invitations, userId })
}

exports.invitation_new_get = async (req, res) => {
  // reference https://stackoverflow.com/questions/4299991/how-to-sort-in-mongoose
  const users = await User.find({}).sort("username")
  const currentUser = req.session.user._id
  const allUsers = users.filter(
    (user) => user._id.toString() !== currentUser.toString()
  )

  const event = await Event.findById(req.params.eventId)
  res.render("invitations/new.ejs", { allUsers, event })
}

exports.invitation_new_post = async (req, res) => {
  req.body.user_id = req.session.user._id
  const event = await Event.findById(req.params.eventId)
  if (event) {
    event.eventStatus = "Sent"
    await event.save()
  }
  await invitationOrganizer.create(req.body)
  res.redirect("/invitations")
}

exports.invitation_show_get = async (req, res) => {
  const invitations = await invitationOrganizer.findById(req.params.invitationId).populate("event_id").populate("guests")
  const currentUser = req.session.user._id
  const invitationResponse = await invitation.find({invitationCreated_id: req.params.invitationId}).populate("guest_id")
  const guests = invitationResponse
  res.render("invitations/show.ejs", {invitations, currentUser, invitationResponse})
}

exports.invitation_show_guest_get = async (req, res) => {
  const invitations = await invitationOrganizer.findById(req.params.invitationId).populate("event_id").populate("guests")
  const currentUser = req.session.user._id
  const invitationResponse = await invitation.findOne({
    guest_id:  currentUser,
    invitationCreated_id: req.params.invitationId
  })
  res.render("invitations/showguest.ejs", {invitations, currentUser, invitationResponse})
}

exports.invitation_show_guest_post = async (req, res) => {
  const invitationsId = await invitationOrganizer.findById(req.params.invitationId).populate("event_id").populate("guests")
  const userId = req.session.user._id
  req.body.invitationCreated_id = invitationsId
  req.body.guest_id = userId
  await invitation.create(req.body)

  const invitations = await invitationOrganizer.find().populate("event_id").populate("guests")
  res.render("invitations/index.ejs", { invitations, userId})
}

exports.invitation_edit_get = async (req, res) => {
  const invitations = await invitationOrganizer
    .findById(req.params.invitationId)
    .populate("event_id")
    .populate("guests")
  const users = await User.find({}).sort("username")
  const currentUser = req.session.user._id
  const allUsers = users.filter(
    (user) => user._id.toString() !== currentUser.toString()
  )

  res.render("invitations/edit.ejs", { invitations, allUsers })
}

exports.invitation_edit_put = async (req, res) => {
  const invitations = await invitationOrganizer
    .findById(req.params.invitationId)
    .populate("guests")
  const invitationId = req.params.invitationId
  const newGuests = req.body.guests

    const updatedGuests = await invitationOrganizer.findByIdAndUpdate(invitationId,
      {$push: {guests: newGuests}}
    )

  res.redirect(`/invitations/${invitationId}`)
}

exports.invitation_delete_delete= async(req,res)=>{
  const invitations = await invitationOrganizer.findByIdAndDelete(req.params.invitationId)
  res.redirect("/invitations")
}

exports.invitation_guest_delete= async(req,res)=>{
  const deleteGuests = req.params.guestId
  const invitationId = req.params.invitationId
  const invitations = await invitationOrganizer.findByIdAndUpdate(invitationId,
      {$pull: {guests: deleteGuests}})
  res.redirect('/invitations')
}

exports.invitation_send_get = async (req, res) => {
  const invitations = await invitationOrganizer.findById(req.params.invitationId)
  res.render("invitations/send.ejs", {invitations})
}

exports.invitation_send_post = async (req, res) => {
  const invitations = await invitationOrganizer.findById(req.params.invitationId)
  if(invitations){
    invitations.sendInvitation = "Sent"
    await invitations.save()
  }
  res.render("invitations/send.ejs")
}
