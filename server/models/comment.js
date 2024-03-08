import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    message: { type: String, required: true },
    article: { type: Schema.Types.ObjectId, ref: "article", required: true },
    author: { type: Schema.Types.ObjectId, ref: "user", required: true },
    timestamp: { type: Date, required: true }
  });

const commentModel = mongoose.model("comment", commentSchema);

export default commentModel;