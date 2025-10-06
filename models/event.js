const mongoose = require('mongoose')
const { boolean } = require('webidl-conversions')

const eventSchema = new mongoose.Schema({
  title:{
    type: String,
    required: true
  },
  description:{
    type: String,
  },
  address:{
    type: String,
    required: true
  },
  eventStatus:{
    type:String,
    enum: ["Draft", "Sent", "Completed"]
  },
  isPublic:{
    type:Boolean,
  },
  limit:{
    type: Number
  },
  time:{
    type: String,
  },
  date:{
    type: String,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
},
  {
    timestamps: true
  }
)

const Event = mongoose.model("Event", eventSchema)
module.exports = Event
