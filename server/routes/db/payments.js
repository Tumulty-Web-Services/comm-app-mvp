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
  app.get('/api/v1/payments/get/all', async (req, res) => {
    res.send([{}]);
    return;

    const { id } = req.params;

    let payments = await db.sequelize.query(
      `SELECT p.*, u.email AS "user_email", u.id AS user_id, u."family_name" AS "user_family_name", u."givenName" as "user_givenName", u."picture_url" AS "user_picture_url" FROM payments p
            LEFT JOIN users u
            ON u.id = p.user_id       
        ;`, {
        bind: {
          id,
        },
      },
    );

    payments = payments[0];

    res.send(payments);
  });

  // get a feature request and who submitted it
  app.get('/api/v1/payments/user/:id', async (req, res) => {
    res.send([{}]);
    return;

    const { id } = req.params;

    let payments = await db.sequelize.query(
      `SELECT p.*, u.email AS "user_email", u.id AS user_id, u."family_name" AS "user_family_name", u."givenName" as "user_givenName", u."picture_url" AS "user_picture_url" FROM payments p
            LEFT JOIN users u
            ON u.id = p.user_id       
            WHERE p."user_id" = $id     
        ;`, {
        bind: {
          id,
        },
      },
    );

    payments = payments[0];

    res.send(payments);
  });
};
