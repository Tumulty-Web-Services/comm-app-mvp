/*
Documentation

this page creates the schema for course_support_tickets

*/
const mongoose = require('mongoose');
const { Schema } = mongoose;

const courseSupportTicketSchema = new Schema({

    text: { 
        type: String,
    }, 

    reason: { 
        type: String,
    }, 

    user_id: { 
        type: 'ObjectId',
        required: true
    }, 

    lesson_id: { 
        type: 'ObjectId',
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

mongoose.model('course_support_tickets', courseSupportTicketSchema)