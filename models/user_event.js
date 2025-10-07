const mongoose = require('mongoose')

const userEventSchema = new mongoose.Schema({
  role:{
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

const UserEvent = mongoose.model("UserEvent", userEventSchema)
module.exports = UserEvent
