const Event = require("../models/event")
exports.event_index_get = async (req, res) => {
  const events = await Event.find().populate("user_id") // Using populate owner is to display the owner from the user model
  res.render("events/index.ejs", { events })
}
exports.event_new_get = async (req, res) => {
  res.render("events/new.ejs")
}
exports.event_new_post = async (req, res) => {
  req.body.user_id = req.session.user._id
  req.body.isPublic === "on"
    ? (req.body.isPublic = true)
    : (req.body.isPublic = false)
  await Event.create(req.body)
  res.redirect("/events")
}
exports.event_show_get=async(req,res)=>{
  const events = await Event.findById(req.params.eventID).populate("user_id")
  const currentUser = req.session.user._id
  res.render("events/show.ejs",{events, currentUser})
}
exports.event_delete_delete=async(req,res)=>{
  const event = await Event.findByIdAndDelete(req.params.eventID)
  res.redirect("/events")
}
