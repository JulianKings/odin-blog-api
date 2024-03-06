import mongoose from 'mongoose';
import { DateTime } from 'luxon';

const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    message: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: "category", required: true },
    author: { type: Schema.Types.ObjectId, ref: "user", required: true },
    timestamp: { type: Date, required: true },
    likes: { type: Number, required: true },
    imageUrl: { type: String }
  });

articleSchema.virtual("formatted_timestamp").get(function() {
    return (this.timestamp ? DateTime.fromJSDate(this.timestamp).toLocaleString(DateTime.DATE_MED) : '')
});

articleSchema.virtual("image_url").get(function() {
    return (this.imageUrl === '' ? './assets/newspaper.webp' : this.imageUrl)
});

const articleModel = mongoose.model("article", articleSchema);

export default articleModel;