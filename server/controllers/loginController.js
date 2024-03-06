import expressAsyncHandler from "express-async-handler";
import { body, validationResult } from 'express-validator';

import jwt from 'jsonwebtoken';

export default function(passport) {
    return {
        post_login: [
            // Validate and sanitize fields.
            body("userName", "User name must not be empty.")
                .trim()
                .isLength({ min: 1 })
                .escape(),
            body("password", "Password must not be empty.")
                .trim()
                .isLength({ min: 1 })
                .escape(),    
        
            expressAsyncHandler(async (req, res, next) => {
                const errors = validationResult(req);

                if(!errors.isEmpty())
                {
                    // send response with errors
                    const responseObject = {
                        responseStatus: 'invalidLogin',
                        errors: errors.array()
                    }
                    return res.json(responseObject);
                } else {
                    passport.authenticate(
                    'login',
                    async (err, user, info) => {
                        try {
                            if (err) {
                                const error = new Error('An error occurred.');
                    
                                return next(error);
                            }

                            if(user === false)
                            {
                                // send response with errors
                                const responseObject = {
                                    responseStatus: 'failedLogin',
                                    errors: [info]
                                }
                                return res.json(responseObject);
                            }
                    
                            req.login(
                                user,
                                { session: false },
                                async (error) => {
                                if (error) return next(error);
                    
                                const body = { _id: user._id, username: user.username };
                                const token = jwt.sign({ user: body }, req.app.settings.jwt_secret_password, { expiresIn: '2h' });
                    
                                return res.json({ responseStatus: 'validLogin', token: token });
                                }
                            );
                        } catch (error) {
                            return next(error);
                        }
                    }
                    )(req, res, next);
                }
            })
        ]
    }
}