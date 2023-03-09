import express from 'express';
import { getMessages, getSenderList, sendMessage } from '../controllers/messageController.js';
const router = express.Router();

import {protect} from '../middleware/authMiddleware.js'


router.route('/send').post(protect, sendMessage)
router.route('/getmessage').post(protect, getMessages)
router.route('/senders').get(protect, getSenderList)




export default router