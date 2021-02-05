/*
Documentation

this page creates the schema for course_comments

*/
const mongoose = require('mongoose');

const { Schema } = mongoose;

const articleComments = new Schema({

  article_id: {
    type: 'ObjectId',
    required: true,
  },

  name: {
    type: String,
  },
  picture_url: {
    type: String,
  },

  text: {
    type: String,
  },

  created_at: {
    type: Number,
    default: Math.round((new Date()).getTime() / 1000),
  },

});

mongoose.model('article_comments', articleComments);
