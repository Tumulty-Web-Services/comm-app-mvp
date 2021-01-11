

/*
Documentation

This file holds all the routes for our internal api on the Users table
when creating new CRUD routes for a new table, start by copying this file.

then: 
1) change routeName to new route name
2) change modelName to match a new model name



model names must be the table name but with a capitalize first letter

*/

// const db = require('../../../models/index');

const mongoose = require('mongoose');
const CommModules = mongoose.model('comm_modules');

module.exports = (app) => {


    //get a feature request and who submitted it
    app.get('/api/v1/comm_modules/get/:id', async (req, res) => {

        const module_id = req.params.id;
       
        const foundModule = await CommModules.findOne({user_id: module_id});

        res.send(foundModule);

    })

    //get a feature request and who submitted it
    app.post('/api/v1/comm_modules/update/:user_id', async (req, res) => {

        const user_id = req.params.user_id;

        console.log(req.body)
       
        const updatedModule = await CommModules.findOneAndUpdate({user_id}, {$set:req.body});

        res.send(updatedModule);

    })
    

  

};