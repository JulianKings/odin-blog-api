import express from 'express';
import { article_view, articles_all, articles_all_latest, articles_all_popular } from '../controllers/articleController';
var router = express.Router();

router.get('/', articles_all_latest);
router.get('/all', articles_all);
router.get('/popular', articles_all_popular);
router.get('/:id', article_view)

export default router;
