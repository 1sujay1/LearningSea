const mongoose = require("mongoose");

const Subscription = mongoose.model(
  "Subscription",
  new mongoose.Schema({
    user_id: String,
    plan_id: { type: String, default: null },
    preference_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user_preference', default: null },
    start_date: { type: Date, default: null },
    end_date: { type: Date, default: null },
  }, {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    versionKey: false,
  }),
  "subscriptions"
);

module.exports = Subscription;
