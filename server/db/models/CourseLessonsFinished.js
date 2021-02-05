/*
Documentation

this page creates the schema for course_lessons_finished

*/
const mongoose = require('mongoose');

const { Schema } = mongoose;

const courseLessonsFinishedSchema = new Schema({

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

mongoose.model('course_lessons_finished', courseLessonsFinishedSchema);
