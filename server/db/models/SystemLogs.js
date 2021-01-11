/*
Documentation

this page creates the schema for course_support_tickets

*/
const mongoose = require('mongoose');
const { Schema } = mongoose;

// updated_at: DataTypes.INTEGER,
// created_at: DataTypes.INTEGER,
// error_code: DataTypes.INTEGER,
// critical: DataTypes.BOOLEAN,
// text: DataTypes.STRING

const systemLogSchema = new Schema({

    error_code: { 
        type: Number,
    }, 

    critical: { 
        type: Boolean,
    }, 

    text: { 
        type: String,
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

mongoose.model('system_logs', systemLogSchema)