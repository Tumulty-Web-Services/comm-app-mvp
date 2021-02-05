/*
Documentation

this page creates the schema for course_lessons

*/
const mongoose = require('mongoose');

const { Schema } = mongoose;

const courseLessonSchema = new Schema({

  worksheet: {
    type: String,
  },

  order: {
    type: Number,
  },

  video_url: {
    type: String,
  },

  picture_url: {
    type: String,
  },

  description: {
    type: String,
  },

  excerpt: {
    type: String,
  },

  name: {
    type: String,
    required: true,
  },

  module_id: {
    type: 'ObjectId',
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

mongoose.model('course_lessons', courseLessonSchema);
