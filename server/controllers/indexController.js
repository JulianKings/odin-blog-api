import expressAsyncHandler from "express-async-handler";
import { body, validationResult } from 'express-validator';
import userSubscriptionModel from "../models/user_subscription";

const post_subscription = [
    // Validate and sanitize fields.
    body("email", "Email must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)
    .withMessage('Please input a valid e-mail address.')
    .escape(),    
    expressAsyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        if(!errors.isEmpty())
        {
            // send response with errors
            const responseObject = {
                responseStatus: 'invalidSubscription',
                errors: errors.array()
            }
            return res.json(responseObject);
        } else {
            const findSubscription = await userSubscriptionModel.findOne({ mail: req.body.email }).exec();

            if(!findSubscription)
            {
                const newSubscription = new userSubscriptionModel({
                    mail: req.body.email
                });

                await newSubscription.save();

                const responseObject = {
                    responseStatus: 'validSubscription'
                }
                return res.json(responseObject);
            }
        }
})];

export { post_subscription }