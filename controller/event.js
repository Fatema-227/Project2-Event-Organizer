const Event = require("../models/event")
const User=require("../models/user")
exports.event_index_get = async (req, res) => {
  const publicEvent=await Event.find().populate("user_id")
  const events = await Event.find({user_id: req.session.user._id}).populate("user_id")
  let userInSession=req.session.user._id
  //this part from chatGPT
  const now = new Date()
  for (let ev of events) {
    let eventDateTime = new Date(ev.date);
    if (ev.time) {
      const [hours, minutes] = ev.time.split(':');
      eventDateTime.setHours(hours);
      eventDateTime.setMinutes(minutes);
      eventDateTime.setSeconds(0);
      eventDateTime.setMilliseconds(0);
    }

    if (now > eventDateTime && ev.eventStatus !== 'Completed') {
      ev.eventStatus = 'Completed';
      await ev.save();
    }
  }
  res.render("events/index.ejs", { events, publicEvent, userInSession})
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
exports.event_edit_get=async(req,res)=>{
  const event = await Event.findById(req.params.eventID)
  res.render("events/edit.ejs",{event})
}
exports.event_edit_put=async(req,res)=>{
  req.body.isPublic = req.body.isPublic === "on" ? true : false;
  if (!req.body.isPublic) {
    req.body.limit = null;
  }
  if (req.body.dateTime) {
    req.body.dateTime = new Date(req.body.dateTime);
  }
  await Event.findByIdAndUpdate(req.params.eventID, req.body)
  res.redirect(`/events/${req.params.eventID}`)
}
