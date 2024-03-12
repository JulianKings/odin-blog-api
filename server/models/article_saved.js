import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const articleSavedSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "user", required: true },
    article: { type: Schema.Types.ObjectId, ref: "article", required: true },
  });

const articleSavedModel = mongoose.model("article_saved", articleSavedSchema);

export default articleSavedModel;