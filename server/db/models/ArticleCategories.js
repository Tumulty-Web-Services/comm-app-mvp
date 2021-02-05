/*
Documentation

this page creates the schema for course_comments

*/
const mongoose = require('mongoose');

const { Schema } = mongoose;

const articleCategories = new Schema({

  article_id: {
    type: 'ObjectId',
    required: true,
  },
  name: {
    type: String,
    required: true,
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

mongoose.model('article_categories', articleCategories);
