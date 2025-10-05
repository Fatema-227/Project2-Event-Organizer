const mongoose = require('mongoose')

const invitationSchema = new mongoose.Schema({
  comment:{
    type:String,
  },
  invitationStatus: {
    type: String,
    enum: ["Pending", "Accepted", "Declined", "Cancelled/ Completed"]
  },
  user_event_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserEvent',
    required: true
  }
},
  {
    timestamps: true
  }
)



const Invitation = mongoose.model("Invitation", invitationSchema)
module.exports = Invitation
