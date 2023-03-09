import mongoose from 'mongoose'

const connectDB = async () => {

  if (mongoose.connection.readyState===0) {
    try {
      const conn = await mongoose.connect(process.env.MONGODB_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        
      })
  
      console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
      console.error(`Error: ${error.message}`)
      process.exit(1)
    }
  }
  
}

export default connectDB