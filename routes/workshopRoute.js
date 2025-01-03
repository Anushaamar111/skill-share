import express from 'express';
import { createWorkshop, getWorkshop, enrollWorkshop, addAnnouncement } from '../controller/workshopController.js';
import { isAuthenticated } from '../middleware/authmiddleware.js';

const router = express.Router();

router.route('/create').post(isAuthenticated, createWorkshop);
router.route('/getWorkshop').get(getWorkshop);
router.route('enroll').post(isAuthenticated, enrollWorkshop);
router.route('/addAnnouncement').post(isAuthenticated, addAnnouncement);

export default router;