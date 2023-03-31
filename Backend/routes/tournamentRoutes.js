import express from 'express';
const router = express.Router();
import {createTournament, deleteTournament, getTournamentById, getTournaments, updateTournament} from '../controllers/tournamentController.js'
import {protect} from '../middleware/authMiddleware.js'


router.route('/add').post(protect, createTournament)
router.route('/').get( getTournaments)
router.route('/:id').get(protect, getTournamentById)
router.route('/delete/:id').delete(protect, deleteTournament)
router.route('/update/:id').put( updateTournament)




export default router