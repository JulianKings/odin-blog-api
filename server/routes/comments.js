import express from 'express';
import { comments_view } from '../controllers/commentsController';
var router = express.Router();

router.get('/:id', comments_view)

export default router;
