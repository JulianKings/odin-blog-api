import articleModel from "../models/article";
import categoryModel from "../models/category";

import expressAsyncHandler from "express-async-handler";

const articles_all = expressAsyncHandler(async (req, res, next) => {
    const allArticles = await articleModel.find().sort({ timestamp: -1 })
        .populate("author").populate("category").exec();

    const responseObject = {
        responseStatus: 'validRequest',
        articles: allArticles
    }
    return res.json(responseObject);
});

const articles_all_latest = expressAsyncHandler(async (req, res, next) => {
    const allArticles = await articleModel.find().sort({ timestamp: -1 })
        .populate("author").populate("category").limit(6).exec();

    const responseObject = {
        responseStatus: 'validRequest',
        articles: allArticles
    }
    return res.json(responseObject);
});

const articles_all_popular = expressAsyncHandler(async (req, res, next) => {
    const allArticles = await articleModel.find().sort({ likes: -1 })
        .populate("author").populate("category").limit(5).exec();

    const responseObject = {
        responseStatus: 'validRequest',
        articles: allArticles
    }
    return res.json(responseObject);
});

export { articles_all, articles_all_latest, articles_all_popular }