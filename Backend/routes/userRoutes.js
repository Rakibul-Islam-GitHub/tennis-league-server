import express from 'express';
const router = express.Router();
import {userAuth,getUser,getProfileById,updateMyProfile, userRegister,getUsersList, userUpdate} from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js';

router.post('/', userRegister);
router.route('/').get( protect ,getUsersList )
router.route('/profile').get( protect ,getUser )
router.route('/roleupdate/:id').put( protect ,userUpdate )
router.route('/profile/update').put( protect ,updateMyProfile )
router.post('/login', userAuth);
router.get('/:id', getProfileById);





export default router