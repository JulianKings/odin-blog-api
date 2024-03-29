import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: { type: String, required: true }
  });

const categoryModel = mongoose.model("category", categorySchema);

export default categoryModel;