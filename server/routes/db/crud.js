/*
Documentation

This file holds all the routes for our internal api on the Users collection
when creating new CRUD routes for a new collection, start by copying this file.

then:
1) change routeName to new route name
2) change modelName to match a new model name



model names must be the collection name but with a capitalize first letter

*/

const mongoose = require('mongoose')

module.exports = (app) => {



    //find all by collection
    app.get('/api/:collection/get/all', async(req, res) => {

        var collection = req.params.collection;
        let Collection;

       try {
        Collection = mongoose.model(collection)
       } catch(e) {
           res.status(422).send({
               error: 'The collection name you sent does not exist. Replace it with a collection that does and try again. Collection Name Sent: ' + collection
           })

           return;
       }

        //get all objects from this collection and sort in descending order

        let objects = {};

        try {
            objects = await Collection.find({}).sort({'_id': -1})
        } catch(e) {
            res.status(422).send(e);
            return;
        }

        res.send(objects)

        // var collection = req.params.collection;

        // //check if we should limit results
        // let limit = req.query.limit
        // let limitText = (limit)
        //     ? ` LIMIT $limit`
        //     : '';

        // //check if we have order values
        // let searchColumn = req.query.searchColumn
        // let search = req.query.search
        // let searchText = '';

        // if (searchColumn && search) {
        //     searchText = `WHERE "${searchColumn}" ILIKE $search`;
        // }

        // //check to see if we should order results
        // let order = req.query.order
        // let orderColumn = req.query.orderColumn

        // //set default order to order by newest
        // let orderText = `ORDER BY "id" DESC`;

        // if (order && orderColumn) {
        //     orderText = `ORDER BY "${orderColumn}" ${order}`;
        // }

        // try {
        //     //run the built query
        //     let result = await db
        //         .sequelize
        //         .query(`SELECT * FROM "${collection}"  ${searchText}  ${orderText} ${limitText}`, {
        //             bind: {
        //                 searchColumn,
        //                 orderColumn,
        //                 order,
        //                 search,
        //                 limit
        //             }
        //         });
        //     result = result[0];

        //     res.json(result);
        // } catch (e) {

        //     console.log(e);
        //     res
        //         .status(400)
        //         .send(e);

        // }

    })


    //find document by collection and id
    app.get('/api/:collection/get/:id', async(req, res) => {


        const _id = req.params.id;
        var collection = req.params.collection;
        let Collection;

        if (!_id) {
            res.status(422).json({error: 'No id was passed.'});
        }

        

        try {

            Collection = mongoose.model(collection)

        } catch(e) {

            res.status(422).send({
                error: 'The collection name you sent does not exist. Replace it with a collection that does and try again. Collection Name Sent: ' + collection
            })

        }

        //get all objects from this collection and sort in descending order

        let object = {};

        try {

            object = await Collection.findById(_id);

            if(!object) {
                object = {};
            }

        } catch(e) {

            res.status(422).send(e);
            return;

        }

        res.send(object)

    });

    //update document by collection and id
    app.post('/api/:collection/update/:id', async(req, res, next) => {

        const _id = req.params.id;
        const collection = req.params.collection; 
        const body = req.body;

        let Collection;

        //if we dont have an _id send an error
        if (!_id) {
            res.status(422).json({error: 'No id was passed.'});
            return;
        }

        //if body of request is emtpy send an error
        if(Object.getOwnPropertyNames(body).length === 0){
            res.status(422).json({error: 'No values were past in post request.'});
            return;
          }

        //if a collection name was sent we dont have send an error
        try {

            Collection = mongoose.model(collection)

        } catch(e) {

            res.status(422).send('The collection name you sent does not exist. Replace it with a collection that does and try again. Collection Name Sent: ' + collection)

            return;

        }


        Collection.findOneAndUpdate({_id}, {
            ...body,
            updated_at: Math.round((new Date()).getTime() / 1000)
        }, {new: true}, (e, doc) => {

            //if an error happened in updating send an error
            if (e) {
                res.status(422).json(e)
                return;
            }

            //SUCCESS!! send back updated document
            res.send(doc)
        });

       

    });

    //create document by collection
    app.post('/api/:collection/create', async(req, res) => {

        const collection = req.params.collection; 
        const body = req.body;

        let Collection;

        //if body of request is emtpy send an error
        if(Object.getOwnPropertyNames(body).length === 0){
            res.status(422).json({error: 'No values were past in post request.'});
            return;
          }

        //if a collection name was sent we dont have send an err or
        try {

            Collection = mongoose.model(collection)

        } catch(e) {
            res.status(422).send({
                error: 'The collection name you sent does not exist. Replace it with a collection that does and try again. Collection Name Sent: ' + collection
            })

            return;

        }

        const newDoc = await new Collection ({
            ...body,
            created_at: Math.round((new Date()).getTime() / 1000)
        }).save();

        if(!newDoc) {
            res.status(422).send({error: 'An error occurred creating this document'});
        }

        res.send(newDoc)


    });


    //delete document by collection and _id
    app.post('/api/:collection/delete/:id', async(req, res) => {

        const _id = req.params.id;
        const collection = req.params.collection; 

        let Collection;

        //if we dont have an _id send an error
        if (!_id) {
            res.status(422).json({error: 'No id was passed.'});
            return;
        }

       
        //if a collection name was sent we dont have send an error
        try {

            Collection = mongoose.model(collection)

        } catch(e) {

            res.status(422).send({
                error: 'The collection name you sent does not exist. Replace it with a collection that does and try again. Collection Name Sent: ' + collection
            })

            return;

        }

        Collection.deleteOne({ _id }, function (e) {

            if (e) {
                res.send({success: false, error: 'Something went wrong deleting this document.'});
            }

            res.send({success: true})

          });


    });

};