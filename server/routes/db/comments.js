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

module.exports = (app) => {


    //get a feature request and who submitted it
    app.get('/api/v1/comments/get/all', async (req, res) => {
        res.send([{}]);
        return ;

        let comments = await db.sequelize.query(
            `SELECT c.*, l.name AS "lesson_name",  u.id AS user_id, u.email AS "user_email", u."family_name" AS "user_family_name", u."givenName" as "user_givenName", u."picture_url" AS "user_picture_url" FROM comments c
            LEFT JOIN users u  ON u.id = c.user_id            
            LEFT JOIN lessons l  ON c.lesson_id = l.id            
        ;`)

        comments = comments[0];

        res.send(comments)

    })

    app.get('/api/v1/comments/get_by_lesson/:id', async (req, res) => {

        res.send([{}]);
        return ;

        const id = req.params.id;

        let comments = await db.sequelize.query(
            `SELECT c.*, l.id AS id,  l.name AS "lesson_name",  u.id AS user_id, u.email AS "user_email", u."family_name" AS "user_family_name", u."givenName" as "user_givenName", u."picture_url" AS "user_picture_url" FROM comments c
            LEFT JOIN users u  ON u.id = c.user_id            
            LEFT JOIN lessons l  ON c.lesson_id = l.id
            WHERE c.lesson_id = $id            
        ;`, {
            bind: {
                id
            }
        })

        comments = comments[0];

        res.send(comments)

    })
   


};