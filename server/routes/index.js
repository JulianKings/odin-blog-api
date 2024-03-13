import express from 'express';
import { post_subscription } from '../controllers/indexController';
var router = express.Router();

router.get('/', function(req, res, next) {
});
router.post('/subscribe', post_subscription)

export default router;
