import commentModel from "../models/comment";

import expressAsyncHandler from "express-async-handler";
import { body, validationResult } from 'express-validator';
import articleLikeModel from "../models/article_like";
import articleModel from "../models/article";

export default function(passport) {
    return {
        sso_check: expressAsyncHandler(async (req, res, next) => {
            res.json({
                user: req.user
              })
        }),
        sso_post_comment: [
            // Validate and sanitize fields.
            body("comment", "comment must not be empty.")
                .trim()
                .isLength({ min: 1 })
                .escape(),
            expressAsyncHandler(async (req, res, next) => {
                const errors = validationResult(req);

                if(errors.isEmpty())
                {
                    // valid comment
                    const newComment = new commentModel({
                        message: req.body.comment,
                        article: req.body.article_id,
                        author: req.user._id,
                        timestamp: (new Date())
                    });

                    const result = await (await newComment.save()).populate("author");
                    const responseObject = {
                        responseStatus: 'validComment',
                        commentResult: result
                    }
                    res.json(responseObject);
                }
            }),
        ], 
        sso_check_like: expressAsyncHandler(async (req, res, next) => {
            if(req.params.id < 24)
            {
                // No results
                const responseObject = {
                    responseStatus: 'invalidArticleId',
                }
                return res.json(responseObject);
            }
        
            const findLike = await articleLikeModel.findOne({ user: req.user._id, article: req.params.id});
            
            if(!findLike)
            {
                const responseObject = {
                    responseStatus: 'articleLikeNotFound',
                }
                return res.json(responseObject);
            } else {
                const responseObject = {
                    responseStatus: 'articleLikeFound',
                }
                return res.json(responseObject);
            }
        }),
        sso_do_like: expressAsyncHandler(async (req, res, next) => {
            if(req.params.id < 24)
            {
                // No results
                const responseObject = {
                    responseStatus: 'invalidArticleId',
                }
                return res.json(responseObject);
            }

            const findLike = await articleLikeModel.findOne({ user: req.user._id, article: req.params.id});
            if(!findLike)
            {
                const likedArticle = await articleModel.findById(req.params.id);
                if(likedArticle)
                {
                    const updatedArticle = new articleModel({
                        title: likedArticle.title,
                        description: likedArticle.description,
                        message: likedArticle.message,
                        category: likedArticle.category,
                        author: likedArticle.author,
                        timestamp: likedArticle.timestamp,
                        likes: (likedArticle.likes + 1),
                        imageUrl: likedArticle.imageUrl,
                        _id: likedArticle._id
                    });

                    const newLike = new articleLikeModel({ 
                        user: req.user._id, 
                        article: req.params.id
                    });
                    
                    await Promise.all([articleModel.findByIdAndUpdate(likedArticle._id, updatedArticle, {}),
                    newLike.save()]);

                    const responseObject = {
                        responseStatus: 'articleLiked',
                    }
                    return res.json(responseObject);
                }
            } else {
                const responseObject = {
                    responseStatus: 'articleAlreadyLiked',
                }
                return res.json(responseObject);

            }
        })
    }
}