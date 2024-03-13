import commentModel from "../models/comment";

import expressAsyncHandler from "express-async-handler";
import { body, validationResult } from 'express-validator';
import articleLikeModel from "../models/article_like";
import articleModel from "../models/article";
import articleSavedModel from "../models/article_saved";
import userModel from "../models/user";

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
                        status: likedArticle.status,
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
        }), 

        sso_check_saved_article: expressAsyncHandler(async (req, res, next) => {
            if(req.params.id < 24)
            {
                // No results
                const responseObject = {
                    responseStatus: 'invalidArticleId',
                }
                return res.json(responseObject);
            }
        
            const findSaved = await articleSavedModel.findOne({ user: req.user._id, article: req.params.id});
            
            if(!findSaved)
            {
                const responseObject = {
                    responseStatus: 'articleSavedNotFound',
                }
                return res.json(responseObject);
            } else {
                const responseObject = {
                    responseStatus: 'articleSavedFound',
                }
                return res.json(responseObject);
            }
        }),
        
        sso_do_save_article: expressAsyncHandler(async (req, res, next) => {
            if(req.params.id < 24)
            {
                // No results
                const responseObject = {
                    responseStatus: 'invalidArticleId',
                }
                return res.json(responseObject);
            }

            const findSaved = await articleSavedModel.findOne({ user: req.user._id, article: req.params.id});
            if(!findSaved)
            {
                const likedArticle = await articleModel.findById(req.params.id);
                if(likedArticle)
                {
                    const newSaved = new articleSavedModel({ 
                        user: req.user._id, 
                        article: req.params.id
                    });
                    
                    await newSaved.save();

                    const responseObject = {
                        responseStatus: 'articleSaved',
                    }
                    return res.json(responseObject);
                }
            } else {
                await articleSavedModel.findByIdAndDelete(findSaved._id);
                const responseObject = {
                    responseStatus: 'articleRemovedSave',
                }
                return res.json(responseObject);

            }
        }),

        get_saved_articles: expressAsyncHandler(async (req, res, next) => {
            const allArticles = await articleSavedModel.find({ user: req.user._id})
                .populate("article").exec();
        
            const responseObject = {
                responseStatus: 'validRequest',
                articles: allArticles
            }
            return res.json(responseObject);
        }),

        housekeeping_get_dashboard: expressAsyncHandler(async (req, res, next) => {
            const [allArticles, allComments, articleCount, authorCount] = await Promise.all([
                articleModel.find().sort({ timestamp: -1 }).limit(6)
                .populate("author").exec(),
                commentModel.find().sort({ timestamp: -1 }).limit(6)
                .populate("author").exec(),
                articleModel.countDocuments({}).exec(),
                userModel.countDocuments({
                    $or: [
                        {membership_role: 'administrator'},
                        {membership_role: 'author'}
                    ]
                }).exec()
            ]);
        
            const responseObject = {
                responseStatus: 'validRequest',
                article_count: articleCount,
                author_count: authorCount,
                articles: allArticles,
                comments: allComments
            }
            return res.json(responseObject);
        }),

    }
}