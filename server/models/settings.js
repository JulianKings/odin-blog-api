import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const settingsSchema = new Schema({
    featured_article: { type: Schema.Types.ObjectId, ref: "article", required: true }
  });

const settingsModel = mongoose.model("settings", settingsSchema);

export default settingsModel;