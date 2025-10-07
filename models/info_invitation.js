const mongoose = require('mongoose')

const invitationOrganizerSchema = new mongoose.Schema({
  guests: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }],
  sendInvitation: {
    type: String,
    default:"default"
  },
  event_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
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



const InvitationOrganizer = mongoose.model("InvitationOrganizer", invitationOrganizerSchema)
module.exports = InvitationOrganizer
