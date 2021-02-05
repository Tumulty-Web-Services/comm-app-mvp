/*
Documentation

This file holds all the routes for our internal api on the Users table
when creating new CRUD routes for a new table, start by copying this file.

then:
1) change routeName to new route name
2) change modelName to match a new model name

model names must be the table name but with a capitalize first letter

*/

module.exports = (app) => {
  /*
   Documentation
   Find all from a table

   http://localhost:3000/api/users/get/all?limit=2&searchColumn=givenName&search=John&order=DESC&orderColumn=id

   */

  app.get('/api/system', async (req, res) => {
    res.send({

      // dev

      payment_enabled: false,

      // add ons
      manager_enabled: true,
      course_enabled: true,

    });
  });
};
