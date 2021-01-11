/*
Documentation

this page creates the schema for course_comments

*/
const mongoose = require('mongoose');
const { Schema } = mongoose;

const articleCategoriesNames = new Schema({

    name: { 
        type: String,
        required: true
    }, 

    //needs to be expanded to hold this
    picture_url: { 
        type: String,
        required: true
    }, 

    description: { 
        type: String,
        required: true
    }, 

})

mongoose.model('article_categories_names', articleCategoriesNames)