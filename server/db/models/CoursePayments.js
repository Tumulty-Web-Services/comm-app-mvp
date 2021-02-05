/*
Documentation

this page creates the schema for course_modules

*/
const mongoose = require('mongoose');

const { Schema } = mongoose;

const coursePaymentSchema = new Schema({

  amount: {
    type: Number,
    required: true,
  },

  stripe_charge_id: {
    type: String,
  },

  user_id: {
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

mongoose.model('course_payments', coursePaymentSchema);
