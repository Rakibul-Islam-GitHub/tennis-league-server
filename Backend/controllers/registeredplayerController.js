import asyncHandler from 'express-async-handler'
import Registeredplayer from '../Models/registeredplayerModel.js'

export const addRegisteredplayer= ('/', asyncHandler(async (req, res)=>{
    const {
      eventtype,
      league,
      tournament
    } = req.body;
    
    const player = new Registeredplayer({
      user: req.user._id,
      eventtype,
      league,
      tournament
        
      })
  
    const RegisteredplayerDone= await player.save()

    if (RegisteredplayerDone) {
        res.json(RegisteredplayerDone)
        
    }
    else {
        res.status(404)
        throw new Error('Problem with creating Registeredplayer')
    }


}))




/// get all Registeredplayers 
export const getRegisteredplayers = ('/', asyncHandler(async (req, res)=>{

  if (req.user.isAdmin) {
    const registeredplayers = await Registeredplayer.find().populate({path:'tournament', select:'title format startdate enddate'})
    .populate({path:'user', select:'firstname lastname'})
    .populate({path:'league', select:'title level'})
    
    if (registeredplayers) {
      res.json(registeredplayers);
    } else {
      res.status(404);
      throw new Error("Registeredplayer History not found...");
    }
  }else{
    const registeredplayers = await Registeredplayer.find({user: req.user._id}).populate({path:'tournament', select:'title format startdate enddate'})
    .populate({path:'user', select:'firstname lastname'})
    .populate({path:'league', select:'title level'})
    
    if (registeredplayers) {
      res.json(registeredplayers);
    } else {
      res.status(404);
      throw new Error("Registeredplayer History not found...");
    }
  }
}))


/// delete Registeredplayer 
/// private route
/// api/Registeredplayer/delete/:id
export const deleteRegisteredplayer =
  ("/delete/:id",
  asyncHandler(async (req, res) => {
    const Registeredplayer = await Registeredplayer.deleteOne({_id:req.params.id});
    if (Registeredplayer) {
      res.json({success: true, message:'Registeredplayer deleted successfully'});
    } else {
      res.status(404);
      throw new Error("Registeredplayer Not Found...");
    }
  }));