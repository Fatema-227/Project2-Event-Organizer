const mongoose = require('mongoose')

const invitationOrganizerSchema = new mongoose.Schema({
  guests: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }],
  event_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
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



const InvitationOrganizer = mongoose.model("InvitationOrganizer", invitationOrganizerSchema)
module.exports = InvitationOrganizer
