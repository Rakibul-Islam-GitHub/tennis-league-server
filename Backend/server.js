import express from 'express'
import dotenv from 'dotenv'
import connectDB from './DatabaseConnect/connectDB.js'
import caseRoutes from './routes/caseRoutes.js'
import userRoutes from './routes/userRoutes.js'
import leagueRoutes from './routes/leagueRoutes.js'
import tournamentRoutes from './routes/tournamentRoutes.js'
import registeredplayerRoutes from './routes/registeredplayerRoutes.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'
import cors from 'cors'
import multer from 'multer'


const storage= multer.diskStorage({})

let upload = multer({ storage })

dotenv.config()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
// const corsOptions = {
//   origin: "*",
//   credentials: true, //access-control-allow-credentials:true
//   optionSuccessStatus: 200,
// };
// app.use(cors());
var whitelist = ['http://localhost:3000', 'http://localhost:3000/dashboard', 'http://127.0.0.1:3000', 'https://tennisleague.netlify.app', 'https://tennisleague-v2.netlify.app']

var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  }else{
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}
app.use(cors(corsOptionsDelegate))
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   next();
// });

connectDB()



app.get('/', (req, res) => {
  res.send('API is running....')
})



app.use('/api/user', userRoutes)
app.use('/api/league', leagueRoutes)
app.use('/api/tournament', tournamentRoutes)
app.use('/api/registeredplayer', registeredplayerRoutes)


app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 3001

// mongoose.connection.on('open', function (ref) {
  
  app.listen(
    PORT,
    console.log(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    )
  )

 
// })

