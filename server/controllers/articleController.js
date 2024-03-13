import articleModel from "../models/article";
import categoryModel from "../models/category";

import expressAsyncHandler from "express-async-handler";
import commentModel from "../models/comment";

const articles_all = expressAsyncHandler(async (req, res, next) => {
    const allArticles = await articleModel.find({ status: "active"}).sort({ timestamp: -1 })
        .populate("author").populate("category").exec();

    const responseObject = {
        responseStatus: 'validRequest',
        articles: allArticles
    }
    return res.json(responseObject);
});

const articles_all_latest = expressAsyncHandler(async (req, res, next) => {
    const allArticles = await articleModel.find({ status: "active"}).sort({ timestamp: -1 })
        .populate("author").populate("category").limit(6).exec();

    const responseObject = {
        responseStatus: 'validRequest',
        articles: allArticles
    }
    return res.json(responseObject);
});

const articles_all_popular = expressAsyncHandler(async (req, res, next) => {
    const allArticles = await articleModel.find({ status: "active"}).sort({ likes: -1 })
        .populate("author").populate("category").limit(5).exec();

    const responseObject = {
        responseStatus: 'validRequest',
        articles: allArticles
    }
    return res.json(responseObject);
});

const article_view = expressAsyncHandler(async (req, res, next) => {
    if(req.params.id.length < 24)
    {
        // No results
        const responseObject = {
            responseStatus: 'articleNotFound',
        }
        return res.json(responseObject);
    }
    
    const findArticle = await articleModel.findById(req.params.id)
        .populate("author").populate("category").exec();

    if(findArticle === null)
    {
        // No results
        const responseObject = {
            responseStatus: 'articleNotFound',
        }
        return res.json(responseObject);
    }

    const commentList = await commentModel.find({ article: findArticle._id }).sort({ timestamp: -1 })
        .populate("author").exec();

    const responseObject = {
        responseStatus: 'validRequest',
        article: findArticle,
        comments: commentList
    }
    return res.json(responseObject);
});

export { articles_all, article_view, articles_all_latest, articles_all_popular }