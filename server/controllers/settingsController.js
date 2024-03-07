import categoryModel from "../models/category";
import settingsModel from "../models/settings";

import expressAsyncHandler from "express-async-handler";

const settings_get = expressAsyncHandler(async (req, res, next) => {
    const loadSettings = await settingsModel.findOne()
        .populate({
            path: "featured_article",
            populate: {
                path: 'category',
                model: categoryModel
            }
        }).exec();

    const responseObject = {
        responseStatus: 'validRequest',
        settings: loadSettings
    }
    return res.json(responseObject);
});

export { settings_get }