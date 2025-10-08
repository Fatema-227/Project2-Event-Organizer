const Event = require("../models/event")
const User = require("../models/user")
exports.event_index_get = async (req, res) => {
  const publicEvent = await Event.find().populate("user_id")
  const events = await Event.find({ user_id: req.session.user._id }).populate(
    "user_id"
  )
  let userInSession = req.session.user._id
  //this part from chatGPT
  const now = new Date()
  for (let ev of events) {
    let eventDateTime = new Date(ev.date)
    if (ev.time) {
      const [hours, minutes] = ev.time.split(":")
      eventDateTime.setHours(hours)
      eventDateTime.setMinutes(minutes)
      eventDateTime.setSeconds(0)
      eventDateTime.setMilliseconds(0)
    }

    if (now > eventDateTime && ev.eventStatus !== "Completed") {
      ev.eventStatus = "Completed"
      await ev.save()
    }
  }
  res.render("events/index.ejs", { events, publicEvent, userInSession })
}
exports.event_new_get = async (req, res) => {
  res.render("events/new.ejs")
}
exports.event_new_post = async (req, res) => {
  const events = await Event.find({ user_id: req.session.user._id }).populate(
    "user_id"
  )
  req.body.user_id = req.session.user._id
  const newEventData = {
    ...req.body,
    user_id: req.session.user._id,
    isPublic: req.body.isPublic === "on" ? true : false,
  }
  const newEvent = await Event.create(newEventData)

  if (req.body.submitType === "draft") {
    return res.redirect(`/events`)
  }
  if (req.body.submitType === "invitation") {
    return res.redirect(`/invitations/${newEvent._id}/new`)
  }
}
exports.event_show_get = async (req, res) => {
  const events = await Event.findById(req.params.eventID).populate("user_id")
  const currentUser = req.session.user._id
  const userHasBooked = events.bookedByUsers.some((event) =>
    event.equals(currentUser)
  )
  res.render("events/show.ejs", { events, currentUser, userHasBooked })
}
exports.events_show_postInvitation = async (req, res) => {
  const event = await Event.findById(req.params.eventID)
  await event.save()

  res.redirect(`/invitations/${event._id}/new`)
}
exports.events_book_post = async (req, res) => {
  const event = await Event.findById(req.params.eventID)
  if (event) {
    if (event.limit > 0) {
      event.limit = event.limit - 1
      await event.save()
    }
  }
  await Event.findByIdAndUpdate(req.params.eventID, {
    $push: { bookedByUsers: req.params.userID }, //$push because it's an array with reference
  })
  res.redirect(`/events/${req.params.eventID}`)
}
exports.book_delete = async (req, res) => {
  const event = await Event.findById(req.params.eventID)

  if (event) {
    event.limit = event.limit + 1
    await event.save()
  }
  await Event.findByIdAndUpdate(req.params.eventID, {
    $pull: { bookedByUsers: req.params.userID },
  })
  res.redirect(`/events/${req.params.eventID}`)
}
// exports.events_book_get = async (req, res) => {
//   const events = await Event.findById(req.params.eventID)
//   if(req.params.booked){
//     events.limit = req.params.seats -1
//   } else{
//     events.limit = req.params.seats +1
//   }
//   await events.save()
//   console.log(events.limit)
//   res.redirect(`/events/${req.params.eventID}`)
// }
exports.event_delete_delete = async (req, res) => {
  const event = await Event.findByIdAndDelete(req.params.eventID)
  res.redirect("/events")
}
exports.event_edit_get = async (req, res) => {
  const event = await Event.findById(req.params.eventID)
  res.render("events/edit.ejs", { event })
}
exports.event_edit_put = async (req, res) => {
  req.body.isPublic = req.body.isPublic === "on" ? true : false
  if (!req.body.isPublic) {
    req.body.limit = null
  }
  if (req.body.dateTime) {
    req.body.dateTime = new Date(req.body.dateTime)
  }
  await Event.findByIdAndUpdate(req.params.eventID, req.body)
  res.redirect(`/events/${req.params.eventID}`)
}
