import express from 'express';
const router = express.Router();
import {addRegisteredplayer, deleteRegisteredplayer, getRegisteredplayers} from '../controllers/registeredplayerController.js'
import {protect} from '../middleware/authMiddleware.js'


router.route('/').post(protect, addRegisteredplayer)
router.route('/').get(protect, getRegisteredplayers)
router.route('/delete/:id').delete(protect, deleteRegisteredplayer)





export default router