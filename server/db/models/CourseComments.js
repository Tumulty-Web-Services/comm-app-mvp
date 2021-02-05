/*
Documentation

this page creates the schema for course_comments

*/
const mongoose = require('mongoose');

const { Schema } = mongoose;

const courseCommentSchema = new Schema({

  text: {
    type: String,
  },

  user_id: {
    type: 'ObjectId',
    required: true,
  },

  lesson_id: {
    type: 'ObjectId',
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

mongoose.model('course_comments', courseCommentSchema);
