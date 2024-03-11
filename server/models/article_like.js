import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const articleLikeSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "user", required: true },
    article: { type: Schema.Types.ObjectId, ref: "article", required: true },
  });

const articleLikeModel = mongoose.model("article_like", articleLikeSchema);

export default articleLikeModel;