/*
Documentation

This file holds all the routes for our internal api on the Users table
when creating new CRUD routes for a new table, start by copying this file.

then:
1) change routeName to new route name
2) change modelName to match a new model name

*/

// const db = require('../../db');
// const User = db.User; const Sequelize = require('sequelize'); const fs =
// require("fs");

const mongoose = require('mongoose');

module.exports = (app) => {
  /*
   Documentation
   Find All users

   example request url: http://localhost:5000/api/users/get/all
   */
  app.get('/api/schema/tables/names', async (req, res) => {
    // This code gets all models with their names, type, defaultValue, and isRequired
    const modelNames = mongoose.modelNames();
    const fullArray = [];

    modelNames.forEach((modelName) => {
      const model = mongoose.model(modelName).schema.paths;

      const modelAarray = [];

      for (const property in model) {
        if (model.hasOwnProperty(property)) {
          // do stuffcons

          modelAarray.push({
            [property]: {
              type: model[property].instance,
              defaultValue: model[property].defaultValue,
              isRequired: model[property].isRequired || false,
            },
          });
        }
      }

      fullArray.push({ [modelName]: modelAarray });
    });

    res.send(fullArray);

    return;

    const query = "SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND"
                + " table_type='BASE TABLE'";

    try {
      const result = await db.query(query);
      const tables = [];

      for (let i = result.length - 1; i >= 0; i--) {
        if (result[i][0] !== 'SequelizeMeta') {
          tables.push(result[i][0]);
        }
      }

      res.json(tables);
    } catch (e) {
      res.status(400).send(e);
    }
  });

  app.get('/api/schema/tables/columns', async (req, res) => {
    const tableName = req.query.table;
    const query = `${'SELECT ordinal_position, column_default, is_nullable, COLUMN_NAME, data_type FRO'
                + "M information_schema.COLUMNS WHERE TABLE_NAME = '"}${tableName}' ORDER BY ordinal_position DESC;`;

    try {
      let result = await db.query(query);
      result = result[0];

      const tableColumns = [];

      // create a new file

      for (let i = result.length - 1; i >= 0; i--) {
        //    tableColumns.push(result[i].column_name);
        tableColumns.push(result[i]);
      }

      res.json(tableColumns);
    } catch (e) {
      console.log(e);
      res.status(400).send(e);
    }
  });
};
