/*
Documentation

Permitted Schema:

String
Number
Date
Buffer
Boolean
Mixed
ObjectId
Array
Decimal128
Map

*/

const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({

  // name
  given_name: {
    type: String,
  },

  family_name: {
    type: String,
  },

  picture_url: {
    type: String,
  },

  // address
  address_line_1: {
    type: String,
  },

  address_line_2: {
    type: String,
  },

  city: {
    type: String,
  },

  state: {
    type: String,
  },

  country: {
    type: String,
  },

  postal_code: {
    type: String,
  },

  // user_info

  company_d: {
    type: Number,
    default: 1,
  },

  company_ame: {
    type: String,
  },

  phone: {
    type: String,
  },

  email: {
    type: String,
  },

  // persmissions

  is_dev: {
    type: Boolean,
    default: false,
  },

  is_admin: {
    type: Boolean,
    default: false,
  },

  member_tier: {
    type: Number,
    default: 10,
  },

  active_subscription: {
    type: Boolean,
    default: false,
  },

  // stripe subscriptions
  stripe_period_start: {
    type: Number,
  },

  stripe_period_end: {
    type: Number,
  },

  stripe_sub_id: {
    type: String,
  },

  stripe_cus_id: {
    type: String,
  },

  // social auth

  linkedin_id: {
    type: String,
  },

  facebook_id: {
    type: String,
  },

  google_id: {
    type: String,
  },

  // data

  last_login: {
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

mongoose.model('users', userSchema);
