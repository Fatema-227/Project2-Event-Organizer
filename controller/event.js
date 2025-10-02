const Event=require("../models/event")
exports.event_index_get=async(req,res)=>{
  const events = await Event.find().populate("user_id") // Using populate owner is to display the owner from the user model
  res.render("events/index.ejs", { events })
}
