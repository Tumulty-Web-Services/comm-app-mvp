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
  // get a feature request and who submitted it
  app.get('/api/v1/modules/get/:id', async (req, res) => {
    res.send([{}]);
    return;
    const user_id = req.params.id;

    let modules = await db.sequelize.query(
      'SELECT * from modules ORDER BY "order" ASC  ;',
    );

    modules = modules[0];

    for (let i = 0; i < modules.length; i++) {
      const lessons = await db.sequelize.query(
        `SELECT l.*, (SELECT COUNT(*) finished_lessons FROM finished_lessons fl WHERE fl.user_id = $user_id AND fl.lesson_id = l.id) AS finished FROM lessons l WHERE l.module_id = $module_id   ORDER BY l."order" ASC     
            ;`, {
          bind: {
            user_id,
            module_id: modules[i].id,
          },
        },
      );

      modules[i].lessons = lessons[0];
    }

    res.send(modules);
  });
};
