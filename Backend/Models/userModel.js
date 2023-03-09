import mongoose from 'mongoose'

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      
      default: null,
    },
    phone: {
      type: String,
    },
   
    description: {
      type: String,
    },
    address: {
      type: String,
    },
    profilestatus: {
      type: String,
    },
    level: {
      type: Number,
      default: 0
    },

    isAdmin: {
      type: Boolean,
     
      default: false,
    },
    role: {
      type: String,
      default: 'player',
    },
  },
  {
    timestamps: true,
  }
)

const User = mongoose.model('User', userSchema)

export default User