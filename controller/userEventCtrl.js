const UserEvent = require("../models/user_event")

exports.userEvent_ids_get = async (req, res) => {
  const events = await UserEvent.find({}, "_id")
  res.render("userEvent/ids.ejs", { events })
}
exports.userEvent_role_post = async (req, res) => {
  const { title, role } = req.body
  const newEvent = new UserEvent({ title, role })
  await newEvent.save()
  res.redirect("/userEvent/ids")
}
exports.userEvent_edit_get = async (req, res) => {
  const event = await UserEvent.findById(req.params.id)
  res.render("userEvent/edit.ejs", { event })
}
exports.userEvent_update_put = async (req, res) => {
  await UserEvent.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.redirect("/userEvent/ids")
}
exports.getAllEvents = (req, res) => {
  res.json({ message: 'All user events route works!' })
}

