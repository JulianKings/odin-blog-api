import express from 'express';
import ssoController from '../controllers/ssoController';

export default function(passport) {
    var router = express.Router();

    const controller = ssoController(passport);
    router.get('/', controller.sso_check);
    router.post('/comment', controller.sso_post_comment);
    router.get('/check_like/:id', controller.sso_check_like);
    router.get('/do_like/:id', controller.sso_do_like);
    router.get('/check_saved_article/:id', controller.sso_check_saved_article);
    router.get('/do_save_article/:id', controller.sso_do_save_article);
    router.get('/get_saved_articles', controller.get_saved_articles);
    return router;
}
