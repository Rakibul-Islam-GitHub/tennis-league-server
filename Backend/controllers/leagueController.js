import asyncHandler from 'express-async-handler'
import League from '../Models/leagueModel.js'

export const createLeague= ('/', asyncHandler(async (req, res)=>{
    const {
      title,
      level,
      flight
    } = req.body;
    
    const league = new League({
       
        title,
        level,
        flightInfo: flight,
        
        
      })
  
    const leagueDone= await league.save()

    if (leagueDone) {
        res.json(leagueDone)
        
    }
    else {
        res.status(404)
        throw new Error('Problem with creating league')
    }


}))


/// get league by id
export const getLeagueById = ('/:id', asyncHandler(async (req, res)=>{
  
  const league = await League.findById(req.params.id).populate('user', 'name email')
    if (league) {
      res.json(league);
    } else {
      res.status(404);
      throw new Error("League Details not found...");
    }
}))


/// get all leagues 
export const getLeagues = ('/', asyncHandler(async (req, res)=>{

  const leagues = await League.find()
    if (leagues) {
      res.json(leagues);
    } else {
      res.status(404);
      throw new Error("League History not found...");
    }
}))

/// update delivery, update payment : change ispaid true & isDelivered true
export const updateLeague = ('update/:id', asyncHandler(async (req, res)=>{

  
  
  const updateDone = await League.findOneAndUpdate({_id:req.params.id}, req.body, {
    new: true
  })
    if (updateDone) {
      res.json({success: true});
    } else {
      res.status(404);
      throw new Error("League Details not found...");
    }
}))

/// delete league 
/// private route
/// api/league/delete/:id
export const deleteLeague =
  ("/delete/:id",
  asyncHandler(async (req, res) => {
    const league = await League.deleteOne({_id:req.params.id});
    if (league) {
      res.json({success: true, message:'league deleted successfully'});
    } else {
      res.status(404);
      throw new Error("league Not Found...");
    }
  }));