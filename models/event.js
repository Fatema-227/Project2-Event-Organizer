const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
  title:{
    type: String,
    required: true
  },
  description:{
    type: String,
    required: true
  },
  dateTime:{
    type: Date,
    required: true
  },
  address:{
    type: String,
    required: true
  },
  eventStatus:{
    type:String,
    enum: ["Draft", "Sent", "Completed"]
  },
  scope:{
    type:String,
    enum: ["Public", "Private"]
  },
  limit:{
    type: Number
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
},
  {
    timestamps: true
  }
)

const Event = mongoose.model("Event", eventSchema)
module.exports = Event
