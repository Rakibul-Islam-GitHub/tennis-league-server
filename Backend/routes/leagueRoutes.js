import express from 'express';
const router = express.Router();
import {createLeague, deleteLeague, getLeagueById, getLeagues, updateLeague} from '../controllers/leagueController.js'
import {protect} from '../middleware/authMiddleware.js'


router.route('/add').post(protect, createLeague)
router.route('/').get( getLeagues)
router.route('/:id').get(protect, getLeagueById)
router.route('/delete/:id').delete( deleteLeague)
router.route('/update/:id').put( updateLeague)




export default router