import commentModel from "../models/comment";

import expressAsyncHandler from "express-async-handler";
import { body, validationResult } from 'express-validator';
import articleLikeModel from "../models/article_like";
import articleModel from "../models/article";
import articleSavedModel from "../models/article_saved";
import userModel from "../models/user";
import userSubscriptionModel from "../models/user_subscription";
import categoryModel from "../models/category";
import settingsModel from "../models/settings";

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
            if(req.params.id.length < 24)
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
            if(req.params.id.length < 24)
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
            if(req.params.id.length < 24)
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
            if(req.params.id.length < 24)
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
            const [allArticles, allComments, subscriptionCount, articleCount, authorCount] = await Promise.all([
                articleModel.find().sort({ timestamp: -1 }).limit(6)
                .populate("author").exec(),
                commentModel.find().sort({ timestamp: -1 }).limit(6)
                .populate("author").exec(),
                userSubscriptionModel.countDocuments({}).exec(),
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
                subscription_count: subscriptionCount,
                articles: allArticles,
                comments: allComments
            }
            return res.json(responseObject);
        }),
        housekeeping_get_categories: expressAsyncHandler(async (req, res, next) => {
            const categories = await categoryModel.find({}).exec();
        
            const responseObject = {
                responseStatus: 'validRequest',
                categories: categories
            }
            return res.json(responseObject);
        }),
        housekeeping_post_add_category: [
            // Validate and sanitize fields.
            body("category", "Category name must not be empty.")
                .trim()
                .isLength({ min: 1 })
                .escape()
                .custom(async value => {
                    const category = await categoryModel.findOne({ name: value });
                    if(category) {
                        throw new Error('This category already exists.')
                    }
                }),
            expressAsyncHandler(async (req, res, next) => {
                const errors = validationResult(req);
                if(errors.isEmpty())
                {
                    if(req.user.role === 'administrator' || req.user.role === 'author')
                    {
                        const newCategory = new categoryModel({
                            name: req.body.category
                        })

                        await newCategory.save();
                        const responseObject = {
                            responseStatus: 'categoryAdded'
                        }
                        res.json(responseObject);
                    }                    
                } else {
                    // send response with errors
                    const responseObject = {
                        responseStatus: 'categoryError',
                        errors: errors.array()
                    }
                    return res.json(responseObject);
                }
            }),

        ],
        housekeeping_delete_category: expressAsyncHandler(async (req, res, next) => {
            if(req.body.category_id.length < 24)
            {
                // No results
                const responseObject = {
                    responseStatus: 'invalidCategoryId',
                }
                return res.json(responseObject);
            }

            if(req.user.role !== 'administrator' && req.user.role !== 'author')
            {
                const responseObject = {
                    responseStatus: 'notEnoughPermissions',
                }
                return res.json(responseObject);
            }

            const articlesByCategory = await articleModel.find({category: req.body.category_id}).exec();
            if(articlesByCategory.length > 0)
            {
                const responseObject = {
                    responseStatus: 'confirmDeletion',
                }
                return res.json(responseObject);
            } else {
                // Delete the category

                await categoryModel.findByIdAndDelete(req.body.category_id);
                const responseObject = {
                    responseStatus: 'categoryDeleted',
                }
                return res.json(responseObject);
            }
        }),
        housekeeping_get_category: expressAsyncHandler(async (req, res, next) => {
            if(req.params.id.length < 24)
            {
                // No results
                const responseObject = {
                    responseStatus: 'invalidCategoryId',
                }
                return res.json(responseObject);
            }

            if(req.user.role !== 'administrator' && req.user.role !== 'author')
            {
                const responseObject = {
                    responseStatus: 'notEnoughPermissions',
                }
                return res.json(responseObject);
            }

            const categoryResult = await categoryModel.findOne({ _id: req.params.id}).exec();
            if(!categoryResult)
            {
                const responseObject = {
                    responseStatus: 'unknownCategory',
                }
                return res.json(responseObject);
            } else {
                const responseObject = {
                    responseStatus: 'categoryFound',
                    category: categoryResult
                }
                return res.json(responseObject);
            }
        }),
        housekeeping_put_edit_category: [
            // Validate and sanitize fields.
            body("category", "Category name must not be empty.")
                .trim()
                .isLength({ min: 1 })
                .escape()
                .custom(async value => {
                    const category = await categoryModel.findOne({ name: value });
                    if(category) {
                        throw new Error('This category already exists.')
                    }
                }),
            expressAsyncHandler(async (req, res, next) => {
                const errors = validationResult(req);
                if(errors.isEmpty())
                {
                    if(req.user.role === 'administrator' || req.user.role === 'author')
                    {
                        const updatedCategory = new categoryModel({
                            name: req.body.category,
                            _id: req.body.category_id
                        })

                        await categoryModel.findByIdAndUpdate(req.body.category_id, updatedCategory, {});
                        const responseObject = {
                            responseStatus: 'categoryUpdated'
                        }
                        res.json(responseObject);
                    }                    
                } else {
                    // send response with errors
                    const responseObject = {
                        responseStatus: 'categoryError',
                        errors: errors.array()
                    }
                    return res.json(responseObject);
                }
            }),

        ],
        housekeeping_get_category_deletion: expressAsyncHandler(async (req, res, next) => {
            if(req.params.id.length < 24)
            {
                // No results
                const responseObject = {
                    responseStatus: 'invalidCategoryId',
                }
                return res.json(responseObject);
            }

            if(req.user.role !== 'administrator' && req.user.role !== 'author')
            {
                const responseObject = {
                    responseStatus: 'notEnoughPermissions',
                }
                return res.json(responseObject);
            }

            const categoryResult = await categoryModel.findOne({ _id: req.params.id}).exec();
            if(!categoryResult)
            {
                const responseObject = {
                    responseStatus: 'unknownCategory',
                }
                return res.json(responseObject);
            } else {
                const articlesByCategory = await articleModel.find({ category: req.params.id }).sort({ timestamp: -1 }).exec();
                const responseObject = {
                    responseStatus: 'categoryFound',
                    category: categoryResult,
                    articles: articlesByCategory
                }
                return res.json(responseObject);
            }
        }),
        housekeeping_force_delete_category: expressAsyncHandler(async (req, res, next) => {
            if(req.body.category_id.length < 24)
            {
                // No results
                const responseObject = {
                    responseStatus: 'invalidCategoryId',
                }
                return res.json(responseObject);
            }

            if(req.user.role !== 'administrator' && req.user.role !== 'author')
            {
                const responseObject = {
                    responseStatus: 'notEnoughPermissions',
                    error: "You don't have enough permissions for this action."
                }
                return res.json(responseObject);
            }

            let authorError = false;

            const articlesByCategory = await articleModel.find({category: req.body.category_id}).exec();
            if(articlesByCategory.length > 0)
            {
                let featuredArticleArray = [];
                let articleArray = [];
                articlesByCategory.forEach((article) => {
                    if(article.author.toString() !== req.user._id && req.user.role === 'author')
                    {
                        authorError = true;
                    }

                    articleArray.push(article._id);
                    featuredArticleArray.push({ featured_article: article._id });
                })

                let featuredArticle = await settingsModel.findOne({ $or: featuredArticleArray}).exec();
                if(!featuredArticle)
                {
                    if(!authorError)
                    {
                        await articleModel.deleteMany({ _id: { $in: articleArray}});
                        await categoryModel.findByIdAndDelete(req.body.category_id);
                        const responseObject = {
                            responseStatus: 'categoryDeleted',
                        }
                        return res.json(responseObject);
                    } else {
                        const responseObject = {
                            responseStatus: 'notEnoughPermissions',
                            error: "You don't have enough permissions to delete this category."
                        }
                        return res.json(responseObject);
                    }
                } else {
                    const responseObject = {
                        responseStatus: 'categoryHasFeaturedArticle',
                        error: "This category has a featured article, therefore it can't be deleted."
                    }
                    return res.json(responseObject);
                }
            } else {
                // Delete the category

                await categoryModel.findByIdAndDelete(req.body.category_id);
                const responseObject = {
                    responseStatus: 'categoryDeleted',
                }
                return res.json(responseObject);
            }
        }),
        housekeeping_get_settings: expressAsyncHandler(async (req, res, next) => {
            const [articles, settings] = await Promise.all([articleModel.find({}).exec(),
                settingsModel.findOne({})]);
        
            const responseObject = {
                responseStatus: 'validRequest',
                articles: articles,
                settings: settings
            }
            return res.json(responseObject);
        }),
        housekeeping_put_edit_settings: expressAsyncHandler(async (req, res, next) => {
            if(req.user.role === 'administrator')
            {
                console.log(req.body.settings_id);
                console.log(req.body.featured_article);

                const updatedSetting = new settingsModel({
                    featured_article: req.body.featured_article,
                    _id: req.body.settings_id
                })

                await settingsModel.findByIdAndUpdate(req.body.settings_id, updatedSetting, {});
                const responseObject = {
                    responseStatus: 'settingsUpdated'
                }
                res.json(responseObject);
            }
        }),
        housekeeping_get_articles: expressAsyncHandler(async (req, res, next) => {
            const articles = await articleModel.find({}).populate('author').sort({timestamp: -1}).exec();
        
            const responseObject = {
                responseStatus: 'validRequest',
                articles: articles
            }
            return res.json(responseObject);
        }),
        housekeeping_get_articles_categories: expressAsyncHandler(async (req, res, next) => {
            const categories = await categoryModel.find({}).exec();
        
            const responseObject = {
                responseStatus: 'validRequest',
                categories: categories
            }
            return res.json(responseObject);
        }),
        housekeeping_post_add_article: [
            // Validate and sanitize fields.
            body("article_title", "Article title must not be empty.")
                .trim()
                .isLength({ min: 1 })
                .escape(),
            body("article_description", "Article description must not be empty.")
                .trim()
                .isLength({ min: 1 })
                .escape(),
            body("article_content", "Article content must not be empty.")
                .trim()
                .isLength({ min: 1 })
                .escape(),
            body("article_category", "Article category must not be empty.")
                .trim()
                .isLength({ min: 1 })
                .escape(),
            expressAsyncHandler(async (req, res, next) => {
                const errors = validationResult(req);
                if(errors.isEmpty())
                {
                    if(req.user.role === 'administrator' || req.user.role === 'author')
                    {
                        let imageUrl = req.body.article_image_preset;
                        if(req.body.article_image !== '')
                        {
                            imageUrl = req.body.article_image;
                        }
                        
                        const newArticle = new articleModel({
                            title: req.body.article_title,
                            description: req.body.article_description,
                            message: req.body.article_content,
                            status: 'pending',
                            category: req.body.article_category,
                            author: req.user._id,
                            timestamp: (new Date()),
                            likes: 0,
                            imageUrl: imageUrl
                        });

                        await newArticle.save();

                        const responseObject = {
                            responseStatus: 'articleCreated'
                        }
                        res.json(responseObject);
                    }                    
                } else {
                    // send response with errors
                    const responseObject = {
                        responseStatus: 'articleError',
                        errors: errors.array()
                    }
                    return res.json(responseObject);
                }
            }),

        ],
        housekeeping_get_article: expressAsyncHandler(async (req, res, next) => {
            if(req.params.id.length < 24)
            {
                // No results
                const responseObject = {
                    responseStatus: 'invalidArticleId',
                }
                return res.json(responseObject);
            }

            if(req.user.role !== 'administrator' && req.user.role !== 'author')
            {
                const responseObject = {
                    responseStatus: 'notEnoughPermissions',
                }
                return res.json(responseObject);
            }

            const articleResult = await articleModel.findOne({ _id: req.params.id}).exec();
            if(!articleResult)
            {
                const responseObject = {
                    responseStatus: 'unknownArticle',
                }
                return res.json(responseObject);
            } else {
                const responseObject = {
                    responseStatus: 'articleFound',
                    article: articleResult
                }
                return res.json(responseObject);
            }
        }),
        housekeeping_put_edit_article: [
            // Validate and sanitize fields.
            body("article_title", "Article title must not be empty.")
                .trim()
                .isLength({ min: 1 })
                .escape(),
            body("article_description", "Article description must not be empty.")
                .trim()
                .isLength({ min: 1 })
                .escape(),
            body("article_content", "Article content must not be empty.")
                .trim()
                .isLength({ min: 1 })
                .escape(),
            body("article_category", "Article category must not be empty.")
                .trim()
                .isLength({ min: 1 })
                .escape(),
            expressAsyncHandler(async (req, res, next) => {
                const errors = validationResult(req);
                if(errors.isEmpty() && req.body.article_id.length > 20)
                {
                    const articleResult = await articleModel.findOne({ _id: req.body.article_id}).exec();
                    if(req.user.role === 'administrator' && articleResult || req.user.role === 'author' && articleResult && articleResult.author.toString() === req.user._id)
                    {
                        let imageUrl = req.body.article_image_preset;
                        if(req.body.article_image !== '')
                        {
                            imageUrl = req.body.article_image;
                        }
                        
                        const updatedArticle = new articleModel({
                            title: req.body.article_title,
                            description: req.body.article_description,
                            message: req.body.article_content,
                            status: articleResult.status,
                            category: req.body.article_category,
                            author: req.user._id,
                            timestamp: (new Date()),
                            likes: articleResult.likes,
                            imageUrl: imageUrl,
                            _id: req.body.article_id
                        });

                        await articleModel.findByIdAndUpdate(req.body.article_id, updatedArticle, {});

                        const responseObject = {
                            responseStatus: 'articleUpdated'
                        }
                        res.json(responseObject);
                    }                    
                } else {
                    // send response with errors
                    const responseObject = {
                        responseStatus: 'articleError',
                        errors: errors.array()
                    }
                    return res.json(responseObject);
                }
            }),

        ],
        housekeeping_put_update_article_status: expressAsyncHandler(async (req, res, next) => {
            if(req.body.article_id.length > 20)
            {
                const articleResult = await articleModel.findOne({ _id: req.body.article_id}).populate("author").exec();
                if(req.user.role === 'administrator' && articleResult)
                {
                    const reverseStatus = (req.body.article_status === 'active') ? 'pending' : 'active';
                                        
                    const updatedArticle = new articleModel({
                        title: articleResult.title,
                        description: articleResult.description,
                        message: articleResult.message,
                        status: reverseStatus,
                        category: articleResult.category,
                        author: articleResult.author,
                        timestamp: articleResult.timestamp,
                        likes: articleResult.likes,
                        imageUrl: articleResult.imageUrl,
                        _id: req.body.article_id
                    });

                    await articleModel.findByIdAndUpdate(req.body.article_id, updatedArticle, {});

                    const responseObject = {
                        responseStatus: 'articleStatusUpdated',
                        updatedResult: updatedArticle
                    }
                    res.json(responseObject);
                }                    
            }
        }),
        housekeeping_force_delete_article: expressAsyncHandler(async (req, res, next) => {
            if(req.body.article_id.length < 24)
            {
                // No results
                const responseObject = {
                    responseStatus: 'invalidArticleId',
                }
                return res.json(responseObject);
            }

            if(req.user.role !== 'administrator' && req.user.role !== 'author')
            {
                const responseObject = {
                    responseStatus: 'notEnoughPermissions',
                    error: "You don't have enough permissions for this action."
                }
                return res.json(responseObject);
            }

            const articleData = await articleModel.findOne({_id: req.body.article_id}).exec();
            if(articleData)
            {
                if(req.user.role === 'author' && articleData.author.toString() !== req.user._id)
                {
                    const responseObject = {
                        responseStatus: 'notEnoughPermissions',
                        error: "This article is not yours, so you don't have enough permissions to delete it."
                    }
                    return res.json(responseObject);
                } else {
                    let featuredArticle = await settingsModel.findOne({ featured_article: req.body.article_id }).exec();
                    if(!featuredArticle)
                    {
                        let commentArray = [];
                        let commentList = await commentModel.find({ article: req.body.article_id }).exec();
                        if(commentList && commentList.length > 0)
                        {
                            commentList.forEach((comment) => {
                                commentArray.push(comment._id);
                            })
                            await commentModel.deleteMany({ _id: { $in: commentArray}});
                        }
                        await articleModel.findByIdAndDelete(req.body.article_id);
                        const responseObject = {
                            responseStatus: 'articleDeleted',
                        }
                        return res.json(responseObject);
                    } else {
                        const responseObject = {
                            responseStatus: 'articleIsFeatured',
                            error: "This article has been featured, therefore please change the featured article to other article before deleting this one."
                        }
                        return res.json(responseObject);
                    }
                }
            }
        }),

        housekeeping_get_users: expressAsyncHandler(async (req, res, next) => {
            if(req.user.role !== 'administrator')
            {
                const responseObject = {
                    responseStatus: 'notEnoughPermissions',
                }
                return res.json(responseObject);
            }
            
            const users = await userModel.find({}, {password: 0}).sort({ timestamp: -1 }).exec();
        
            const responseObject = {
                responseStatus: 'validRequest',
                users: users
            }
            return res.json(responseObject);
        }),
        housekeeping_put_update_user_ban: expressAsyncHandler(async (req, res, next) => {
            if(req.body.user_id.length > 20)
            {
                const userResult = await userModel.findOne({ _id: req.body.user_id}).exec();
                if(req.user.role === 'administrator' && userResult)
                {
                    if(userResult.membership_role !== 'administrator')
                    {
                        const reverseBan = !(req.body.user_is_banned);
                                            
                        const updatedUser = new userModel({
                            username: userResult.username,
                            password: userResult.password,
                            email: userResult.email,
                            first_name: userResult.first_name,
                            last_name: userResult.last_name,
                            membership_role: userResult.membership_role,
                            timestamp: userResult.timestamp,
                            is_banned: reverseBan,
                            _id: userResult._id
                        })

                        await userModel.findByIdAndUpdate(req.body.user_id, updatedUser, {});

                        const responseObject = {
                            responseStatus: 'userBanUpdated',
                            updatedResult: updatedUser
                        }
                        res.json(responseObject);
                    }
                }                    
            }
        }),
        housekeeping_put_update_user_role: expressAsyncHandler(async (req, res, next) => {
            if(req.body.user_id.length > 20)
            {
                const userResult = await userModel.findOne({ _id: req.body.user_id}).exec();
                if(req.user.role === 'administrator' && userResult)
                {
                    if(userResult.membership_role !== 'administrator')
                    {
                        const newRole = req.body.user_role;
                                            
                        const updatedUser = new userModel({
                            username: userResult.username,
                            password: userResult.password,
                            email: userResult.email,
                            first_name: userResult.first_name,
                            last_name: userResult.last_name,
                            membership_role: newRole,
                            timestamp: userResult.timestamp,
                            is_banned: userResult.is_banned,
                            _id: userResult._id
                        })

                        await userModel.findByIdAndUpdate(req.body.user_id, updatedUser, {});

                        const responseObject = {
                            responseStatus: 'userRoleUpdated',
                            updatedResult: updatedUser
                        }
                        res.json(responseObject);
                    }
                }                    
            }
        }),

        housekeeping_force_delete_user: expressAsyncHandler(async (req, res, next) => {
            if(req.body.user_id.length < 24)
            {
                // No results
                const responseObject = {
                    responseStatus: 'invalidUserId',
                }
                return res.json(responseObject);
            }

            if(req.user.role !== 'administrator')
            {
                const responseObject = {
                    responseStatus: 'notEnoughPermissions',
                    error: "You don't have enough permissions for this action."
                }
                return res.json(responseObject);
            }

            const userData = await userModel.findOne({_id: req.body.user_id}).exec();
            const articleData = await articleModel.find({ author: req.body.user_id }).exec();
            if(articleData && articleData.length > 0)
            {
                const responseObject = {
                    responseStatus: 'userHasArticles',
                    error: "This user has articles, therefore please remove all the articles owned by this user before deleting this user."
                }
                return res.json(responseObject);
            } else if(userData)
            {
                    let commentArray = [];
                    let commentList = await commentModel.find({ author: req.body.user_id }).exec();
                    if(commentList && commentList.length > 0)
                    {
                        commentList.forEach((comment) => {
                            commentArray.push(comment._id);
                        })
                        await commentModel.deleteMany({ _id: { $in: commentArray}});
                    }
                    await userModel.findByIdAndDelete(req.body.user_id);
                    const responseObject = {
                        responseStatus: 'userDeleted',
                    }
                    return res.json(responseObject);                    
            }
        }),

        housekeeping_force_delete_comment: expressAsyncHandler(async (req, res, next) => {
            if(req.body.comment_id.length < 24)
            {
                // No results
                const responseObject = {
                    responseStatus: 'invalidCommentId',
                }
                return res.json(responseObject);
            }

            if(req.user.role !== 'administrator')
            {
                const responseObject = {
                    responseStatus: 'notEnoughPermissions',
                    error: "You don't have enough permissions for this action."
                }
                return res.json(responseObject);
            }
               
            await commentModel.findByIdAndDelete(req.body.comment_id);
            const responseObject = {
                responseStatus: 'commentDeleted',
            }
            return res.json(responseObject);
        }),
    }
}