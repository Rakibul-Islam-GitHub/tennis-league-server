import mongoose from 'mongoose'

const messageSchema = mongoose.Schema(
  {
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
      },
    reciever: {
        type: String,
        required: true,
       
      },
    
    
    message: {
      type: String,
      required: true,
    },
    caseid: {
      type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Case',
    },
    
    seen: {
      type: Boolean,
      default:false,
    },
    
  },
  {
    timestamps: true,
  }
)

const Message = mongoose.model('Message', messageSchema)

export default Message