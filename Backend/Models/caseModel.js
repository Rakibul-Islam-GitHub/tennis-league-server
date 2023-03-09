import mongoose from 'mongoose'

// const reviewSchema = mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     rating: { type: Number, required: true },
//     comment: { type: String, required: true },
//   },
//   {
//     timestamps: true,
//   }
// )

const caseSchema = mongoose.Schema(
  {
    
    pcpid: {
      type: String, 
      required: true, 
      // ref: 'User',
    },
    title: {
      type: String,
      required: true,
    },
    image: [
      {type: String,
      }
    ],
    imagePublicId: [
      {
        url:{type: String},
        publicId:{type: String}
      }
    ],
    description: {
      type: String,
      default: 'unspecified',
    },
    category: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      default: 'N/A',
    },
  },
  {
    timestamps: true,
  },
 
)

caseSchema.set('toJSON', {
  virtuals: true,
  versionKey:false,
  transform: function (doc, ret) {   delete ret._id  }
});


const Case = mongoose.model('Case', caseSchema)

export default Case