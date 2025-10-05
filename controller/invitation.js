const session = require("express-session")
const Invitation = require("../models/invitation")
const Event = require("../models/event")

exports.invitation_index_get = async (req, res) => {
  const eventDetails = await Event.find().populate("user_id")
  res.render("invitations/index.ejs", {eventDetails})
}
