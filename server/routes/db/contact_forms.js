/*
Documentation

This file holds all the routes for our internal api on the Users table
when creating new CRUD routes for a new table, start by copying this file.

then:
1) change routeName to new route name
2) change modelName to match a new model name

model names must be the table name but with a capitalize first letter

*/

const mongoose = require('mongoose');

const CourseContactForms = mongoose.model('course_support_tickets');

module.exports = (app) => {
  // get a feature request and who submitted it
  app.get('/api/v1/contact_forms/get/all', async (req, res) => {
    const forms = CourseContactForms
      .aggregate([
        {
          $lookup: {
            from: 'users', // collection name in db
            localField: 'user_id',
            foreignField: '_id',
            as: 'user',
          },
        },
      ])
      .exec((e, objects) => {
        // students contain WorksnapsTimeEntries

        res.send(objects);
      });

    // let contact_forms = await db.sequelize.query(     `SELECT cf.*, u.email AS
    // "user_email", u.id AS user_id, u."family_name" AS "user_family_name",
    // u."givenName" as "user_givenName", u."picture_url" AS "user_picture_url" FROM
    // contact_forms cf     LEFT JOIN users u     ON u.id = cf.user_id ;`)
    // contact_forms = contact_forms[0]; res.send(contact_forms)
  });
};
