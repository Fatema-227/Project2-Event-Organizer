const mongoose = require('mongoose')

const invitationSchema = new mongoose.Schema({
  comment:{
    type:String,
  },
  invitationStatus: {
    type: String,
    enum: ["Accepted", "Declined"],
    default: "Pending"
  },
    invitationCreated_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'InvitationOrganizer',
  },
  guest_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
},
  {
    timestamps: true
  }
)



const Invitation = mongoose.model("Invitation", invitationSchema)
module.exports = Invitation
