import expressAsyncHandler from "express-async-handler";
import commentModel from "../models/comment";

const comments_view = expressAsyncHandler(async (req, res, next) => {
    if(req.params.id.length < 24)
    {
        // No results
        const responseObject = {
            responseStatus: 'commentsNotFound',
        }
        return res.json(responseObject);
    }

    const commentList = await commentModel.find({ author: req.params.id }).sort({ timestamp: -1 })
        .populate("author").populate("article").exec();

    const responseObject = {
        responseStatus: 'validRequest',
        comments: commentList
    }
    return res.json(responseObject);
});

export { comments_view }