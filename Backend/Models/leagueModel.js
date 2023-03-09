import mongoose from 'mongoose'

const leagueSchema = mongoose.Schema(
  {
    title: {
      type: String,
      
    },
    level: {
      type: Number,
      default: 0
      
    },
    flightInfo: [
      {
        flight: { type: String },
        players: [{type: Object,
          default:{}}],
        
      },
    ],
    
    type: {
      type: String,
     enum: ['free', 'subscription'],
     default: 'free'
    },
    organizer: {
      type: String,
     enum: ['Admin', 'Other'],
     default: 'Admin'
    },
    subscriptionFee: {
      type: Number,
      default: 0

    },
    isFinished: {
      type: Boolean,
    
      default: false,
    },
    
  },
  {
    timestamps: true,
  }
)

const League = mongoose.model('League', leagueSchema)

export default League