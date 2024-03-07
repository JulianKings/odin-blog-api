import express from 'express';
import { settings_get } from '../controllers/settingsController';
var router = express.Router();

router.get('/', settings_get);

export default router;
