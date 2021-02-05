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
  /*
   Documentation
   create a project

   this not only creates a project with the correct company_id and project name
   it also create the phases assocated with that project
   */
  app.get('/api/course_lessons/get_by_module/:module_id', async (req, res) => {
    res.send([{}]);
    return;

    const { module_id } = req.params;

    const lessons = await db.lessons.findAll({
      where: {
        module_id,
      },
      order: [
        // Will escape title and validate DESC against a list of valid direction parameters
        ['order', 'ASC'],
      ],
    });

    res.send(lessons);
  });
};
