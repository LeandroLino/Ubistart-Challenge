const mongoose = require("../database");

const ArticleSchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  newsSite: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
  },
  publishedAt: {
    type: String,
    required: true,
  },
  updatedAt: {
    type: String,
    required: true,
  },

  launches: [{ id: { type: String }, provider: { type: String } }],
  events: [{ id: { type: String }, provider: { type: String } }],
});

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
