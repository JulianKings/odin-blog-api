import express from 'express';
import ssoController from '../controllers/ssoController';

export default function(passport) {
    var router = express.Router();

    const controller = ssoController(passport);
    router.get('/', controller.sso_check);
    router.post('/comment', controller.sso_post_comment);
    router.get('/check_like/:id', controller.sso_check_like);
    router.get('/do_like/:id', controller.sso_do_like);
    return router;
}
