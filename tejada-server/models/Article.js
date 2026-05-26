const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  author: { type: String, required: true },
  content: { type: String, required: true },
  isPublished: { type: Boolean, default: true },
});

module.exports =
  mongoose.models.Article || mongoose.model("Article", articleSchema);