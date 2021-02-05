/*
Documentation

this page creates the schema for course_comments

*/
const mongoose = require('mongoose');

const { Schema } = mongoose;

const articleSchema = new Schema({

  user_id: {
    type: 'ObjectId',
    required: true,
  },

  headline: {
    type: String,
  },

  excerpt: {
    type: String,
  },

  body: {
    type: String,
  },

  preview: {
    type: Number,
  },

  picture_url: {
    type: String,
  },

  status: {
    type: String,
  },

  views: {
    type: Number,
  },

  published_at: {
    type: Number,
    default: Math.round((new Date()).getTime() / 1000),
  },

  updated_at: {
    type: Number,
    default: Math.round((new Date()).getTime() / 1000),
  },

  created_at: {
    type: Number,
    default: Math.round((new Date()).getTime() / 1000),
  },

});

mongoose.model('articles', articleSchema);
