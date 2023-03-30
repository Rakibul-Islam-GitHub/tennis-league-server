import asyncHandler from 'express-async-handler'
import Tournament from '../Models/tournamentModel.js'

export const createTournament= ('/add', asyncHandler(async (req, res)=>{
    const {
      title,
      description,
      city,
      court,
      format,
      price,
      startdate,
      enddate,
      phone,
      matrix
    } = req.body;
    
    const tournament = new Tournament({
       
      title,
      description,
      city,
      court,
      format,
      price,
      startdate,
      enddate,
      phone,
      matrix
        
        
      })
  
    const tournamentDone= await tournament.save()

    if (tournamentDone) {
        res.json(tournamentDone)
        
    }
    else {
        res.status(404)
        throw new Error('Problem with creating tournament')
    }


}))


/// get tournament by id
export const getTournamentById = ('/:id', asyncHandler(async (req, res)=>{
  
  const tournament = await Tournament.findById(req.params.id).populate('user', 'name email')
    if (tournament) {
      res.json(tournament);
    } else {
      res.status(404);
      throw new Error("Tournament Details not found...");
    }
}))


/// get all tournaments 
export const getTournaments = ('/', asyncHandler(async (req, res)=>{

  const tournaments = await Tournament.find()
    if (tournaments) {
      res.json(tournaments);
    } else {
      res.status(404);
      throw new Error("Tournament History not found...");
    }
}))

/// update delivery, update payment : change ispaid true & isDelivered true
export const updateTournament = ('update/:id', asyncHandler(async (req, res)=>{

  
  
  const updateDone = await Tournament.findOneAndUpdate({_id:req.params.id}, req.body, {
    new: true
  })
    if (updateDone) {
      res.json({success: true});
    } else {
      res.status(404);
      throw new Error("Tournament Details not found...");
    }
}))

/// delete tournament 
/// private route
/// api/tournament/delete/:id
export const deleteTournament =
  ("/delete/:id",
  asyncHandler(async (req, res) => {
    const tournament = await Tournament.deleteOne({_id:req.params.id});
    if (tournament) {
      res.json({success: true, message:'tournament deleted successfully'});
    } else {
      res.status(404);
      throw new Error("tournament Not Found...");
    }
  }));