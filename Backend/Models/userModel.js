import mongoose from 'mongoose'

const userSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
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
    gender: {
      type: String,
      enum: ['male', 'female']
    },
   
    city: {
      type: String,
    },
    ustarating: {
      type: String,
    },
    preferedcourt: {
      type: String,
    },
    phone: {
      type: String,
      
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