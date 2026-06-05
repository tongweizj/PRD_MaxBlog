import express from 'express';
import * as site from '../controllers/siteController.js';
import * as auth from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/').get(site.read).put(auth.protect, site.update);

export default router;
