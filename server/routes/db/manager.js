/*
Documentation

This file holds all the routes for our internal api on the Users table
when creating new CRUD routes for a new table, start by copying this file.

then:
1) change routeName to new route name
2) change modelName to match a new model name

*/

const db = require('../../db');

module.exports = (app) => {
  /*
    Documentation
    /*
    Documentation

    can get all table names from: /api/sync/info/tables

    */

  /*
   Documentation
   get all tables
   */

  // not currently using, made to support later shit
  app.get('/api/manager/primary_key_of_table', async (req, res) => {
    const query = `SELECT
        a.attname,
        format_type(a.atttypid, a.atttypmod) 
      FROM
        pg_attribute a
        JOIN (SELECT *, GENERATE_SUBSCRIPTS(indkey, 1) AS indkey_subscript FROM pg_index) AS i
          ON
            i.indisprimary
            AND i.indrelid = a.attrelid
            AND a.attnum = i.indkey[i.indkey_subscript]
      WHERE
        a.attrelid = 'users'::regclass
      ORDER BY
        i.indkey_subscript`;

    const result = await db.query(query);

    res.send(result);
  });

  // not currently using, made to support later shit
  app.get('/api/manager/table_counts', async (req, res) => {
    res.send([{}]);
    return;

    const query = `select table_schema, 
        table_name, 
        (xpath('/row/cnt/text()', xml_count))[1]::text::int as row_count
 from (
   select table_name, table_schema, 
          query_to_xml(format('select count(*) as cnt from %I.%I', table_schema, table_name), false, true, '') as xml_count
   from information_schema.tables
   where table_schema = 'public' AND table_NAME != 'SequelizeMeta' AND table_NAME != 'pg_stat_statements' 
 ) t`;

    const result = await db.query(query);

    console.log(result[0]);

    res.send(result[0]);
  });

  app.get('/api/manager/table_schema', async (req, res) => {
    const query = `select 
        table_name, 
        (xpath('/row/cnt/text()', xml_count))[1]::text::int as row_count
 from (
   select table_name, table_schema, 
          query_to_xml(format('select count(*) as cnt from %I.%I', table_schema, table_name), false, true, '') as xml_count
   from information_schema.tables
   where table_schema = 'public' AND table_name != 'SequelizeMeta' AND table_name != 'pg_stat_statements'
 ) t`;

    const dataToSend = [];

    let result = await db.query(query);
    result = result[0];
    const tables = [];

    for (let x = 0; x < result.length; x++) {
      const tableName = result[x].table_name;
      const rowCount = result[x].row_count;

      const query = `SELECT column_name, data_type, ordinal_position, column_default, is_nullable, character_maximum_length, udt_name FROM information_schema.COLUMNS WHERE TABLE_NAME = '${tableName}';`;

      let columns = await db.query(query);
      columns = columns[0];

      const columnObject = {
        name: tableName,
        rowCount,
        columns: [],
      };

      // console.log(columns)

      // for (let i = columns.length - 1; i >= 0; i--) {
      for (let i = 0; i < columns.length; i++) {
        const columnLoop = {};

        // dont add id to model

        columnLoop.name = columns[i].column_name;
        columnLoop.data_type = columns[i].data_type;
        columnLoop.ordinal_position = columns[i].ordinal_position;
        columnLoop.column_default = columns[i].column_default;
        columnLoop.is_nullable = columns[i].is_nullable;
        columnLoop.character_maximum_length = columns[i].character_maximum_length;
        columnLoop.udt_name = columns[i].udt_name;

        columnObject.columns.push(columnLoop);
      }

      dataToSend.push(columnObject);
    }

    res.json(dataToSend);
  });
};
