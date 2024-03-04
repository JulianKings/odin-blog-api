import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true},
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    membership_role: { type: String, required: true }
  });

const userModel = mongoose.model("user", userSchema);

export default userModel;