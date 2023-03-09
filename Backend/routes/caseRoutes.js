import express from 'express';
import { createCase, getAllcases, updateCase } from '../controllers/caseController.js';
const router = express.Router();

import {protect} from '../middleware/authMiddleware.js'

router.route('/').get( getAllcases)
router.route('/add').post(protect, createCase)
// router.route('/delete/:id').delete( deleteProduct)
router.route('/update/:id').put( updateCase)
// router.route('/:id').get( getItemByID)
// router.route('/review/add/:id').post( protect, addReview)




export default router