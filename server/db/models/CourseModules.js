/*
Documentation

this page creates the schema for course_modules

*/
const mongoose = require('mongoose');
const { Schema } = mongoose;

const courseModuleSchema = new Schema({

    order: { 
        type: Number,
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
        required: true
    }, 

    updated_at: { 
        type: Number,
        default: Math.round((new Date()).getTime() / 1000)
    }, 

    created_at: { 
        type: Number,
        default: Math.round((new Date()).getTime() / 1000)
    }, 

    

})

mongoose.model('course_modules', courseModuleSchema)