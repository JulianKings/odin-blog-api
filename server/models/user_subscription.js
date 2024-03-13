import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSubscriptionSchema = new Schema({
    mail: { type: String, required: true }
  });

const userSubscriptionModel = mongoose.model("user_subscription", userSubscriptionSchema);

export default userSubscriptionModel;