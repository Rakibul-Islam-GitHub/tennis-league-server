import mongoose from 'mongoose'

const tournamentSchema = mongoose.Schema(
  {
    title: {
      type: String,
      
    },
    description: {
      type: String,
      
    },
   
    city: {
      type: String,
     
    },
    court: {
      type: String,
   
    },
    format: {
      type: String,
    
    },
    matrix: {
      singlefemale: {type: Array},
      singlemale: {type: Array},
      doublemale: {type: Array},
      doublefemale: {type: Array},
      doublemixed: {type: Array},
    
    },
    price:{
      type: String

    },
    startdate:{
      type : String

    },
    enddate:{
      type : String

    },
    phone:{
      type : String

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

const Tournament = mongoose.model('Tournament', tournamentSchema)

export default Tournament