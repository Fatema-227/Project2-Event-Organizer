const mongoose = require('mongoose')

const user_eventSchema = new mongoose.Schema({
  eventStatus:{
    type:String,
    enum: ["Organizer", "VIPGuest", "RegularGuest", "Helper"]
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
    event_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  }
},
  {
    timestamps: true
  }
)

const UserEvent = mongoose.model("UserEvent", user_eventSchema)
module.exports = UserEvent
