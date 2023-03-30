import mongoose from 'mongoose'

const registeredplayerSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    league: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'League',
      
    },
   
    tournament: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tournament'
      
    },
   
    eventtype: {
      type: String,
     enum: ['tournament', 'league'],
     
    },
    
    
  },
  {
    timestamps: true,
  }
)

const Registeredplayer = mongoose.model('Registeredplayer', registeredplayerSchema)

export default Registeredplayer