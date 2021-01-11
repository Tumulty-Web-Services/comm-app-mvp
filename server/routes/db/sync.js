// /*
// Documentation

// This file holds all the routes for our internal api on the Users table
// when creating new CRUD routes for a new table, start by copying this file.

// then: 
// 1) change routeName to new route name
// 2) change modelName to match a new model name

// */

// const db = require('../../db');
// const User = db.User;
// const Sequelize = require('sequelize');
// const keys = require('../../../keys');
// const config = require('../../../config/config');

// const fs = require("fs");
// const Axios = require('axios');

// const csv = require('csvtojson')
// const request = require('request')

// module.exports = (app) => {

//     /*
//     Documentation
    
//     can get all table names from: /api/sync/info/tables

//     */

//     /*
//    Documentation
//    get all tables
//    */

//    ///testtesttest
//     app.get('/api/sync/info/testtest', async (req, res) => {

//         const query = `SELECT
//         a.attname,
//         format_type(a.atttypid, a.atttypmod) 
//       FROM
//         pg_attribute a
//         JOIN (SELECT *, GENERATE_SUBSCRIPTS(indkey, 1) AS indkey_subscript FROM pg_index) AS i
//           ON
//             i.indisprimary
//             AND i.indrelid = a.attrelid
//             AND a.attnum = i.indkey[i.indkey_subscript]
//       WHERE
//         a.attrelid = 'users'::regclass
//       ORDER BY
//         i.indkey_subscript`

//         let result = await db.query(query);

//         res.send(result)

//     })

//     app.get('/api/sync/info/tables', async (req, res) => {

//         const query = "SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_type='BASE TABLE'"

//         let result = await db.query(query);

//         res.send(JSON.stringify({
//             success: "true",
//             message: "success",
//             data: result
//         }));

//     })

//     /*
//     get columns for specific tables
//     */

//    app.get('/api/sync/columns/:table', async (req, res) => {

//     var tableName = req.params.table;

//         const query = "SELECT COLUMN_NAME, data_type, is_nullable FROM information_schema.COLUMNS WHERE TABLE_NAME = '" + tableName + "';"

//         let columns = await db.query(query);
//         columns = columns[0];

//         res.send(columns)

//    });

//     app.get('/api/sync/tables', async (req, res) => {

//         const query = "SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_type='BASE TABLE'"

//         let result = await db.query(query);
//         let tables = [];

//         for (let i = result.length - 1; i >= 0; i--) {
//             let tableName = result[i][0]

//             if (tableName != 'SequelizeMeta') {
//                 // console.log('result', result)
//                 console.log(tableName)

//                 const query = "SELECT COLUMN_NAME, data_type FROM information_schema.COLUMNS WHERE TABLE_NAME = '" + tableName + "';"

//                 let columns = await db.query(query);
//                 columns = columns[0];


//                 //get capitalized mode nae
//                 let tableCapitalized = tableName.charAt(0).toUpperCase() + tableName.slice(1)

//                 //open a new file to create or overwrite
//                 let writeStream = fs.createWriteStream("models/" + tableCapitalized + ".js");
//                 writeStream.write("'use strict'; module.exports = (sequelize, DataTypes) => { const " + tableCapitalized + " = sequelize.define('" + tableName + "', {");

//                 for (let i = columns.length - 1; i >= 0; i--) {

//                     let DATA_TYPE = '';

//                     //dont add id to model
//                     if (columns[i].column_name != 'id') {

//                         //filter out datatype
//                         if (columns[i].data_type === 'character varying') {
//                             DATA_TYPE = 'STRING';
//                         } else if (columns[i].data_type === 'boolean') {
//                             DATA_TYPE = 'BOOLEAN';
//                         } else if (columns[i].data_type === 'integer') {
//                             DATA_TYPE = 'INTEGER';
//                         } else if (columns[i].data_type === 'json') {
//                             console.log('json');
//                             DATA_TYPE = 'JSON';
//                         }

//                         if (DATA_TYPE !== '') {

//                             //set the string to load into the file
//                             let STRING_TO_SET = `${columns[i].column_name}: DataTypes.${DATA_TYPE},`;
//                             writeStream.write(STRING_TO_SET);
//                         }

//                     }

//                 }

//                 writeStream.write(" }, {}); " + tableCapitalized + ".associate = function(models) {   }; return " + tableCapitalized + "; };");
//                 writeStream.end();
//             }


//         }

//         let message = 'All tables were successfully synced to models.';
        

//         //if not tables found change the message
//         if (!result[0]) {
//             message = 'No tables found, database is empty.'
//         }

//         res.send(JSON.stringify({
//             success: "true",
//             message,
//             data: ''
//         }));

//     })

//     /*
//     Documentation
//     sync a specific table
//     */
//     app.get('/api/sync/tables/:table', async (req, res) => {



//         var tableName = req.params.table;
//         const query = "SELECT COLUMN_NAME, data_type FROM information_schema.COLUMNS WHERE TABLE_NAME = '" + tableName + "';"

//         let result = await db.query(query);
//         result = result[0];


//         //create a new file

//         //get capitalized mode nae
//         var tableCapitalized = tableName.charAt(0).toUpperCase() + tableName.slice(1)
//         var writeStream = fs.createWriteStream("models/" + tableCapitalized + ".js");
//         writeStream.write("'use strict'; module.exports = (sequelize, DataTypes) => { const " + tableCapitalized + " = sequelize.define('" + tableName + "', {");



//         for (var i = result.length - 1; i >= 0; i--) {

//             let DATA_TYPE = '';

//             //dont add id to model
//             if (result[i].column_name != 'id') {

//                 //filter out datatype
//                 if (result[i].data_type === 'character varying') {
//                     DATA_TYPE = 'STRING';
//                 } else if (result[i].data_type === 'boolean') {
//                     DATA_TYPE = 'BOOLEAN';
//                 } else if (result[i].data_type === 'integer') {
//                     DATA_TYPE = 'INTEGER';
//                 }

//                 if (DATA_TYPE) {

//                     //set the string to load into the file
//                     let STRING_TO_SET = `${result[i].column_name}: DataTypes.${DATA_TYPE},`;
//                     writeStream.write(STRING_TO_SET);
//                 }

//             }



//         }

//         writeStream.write(" }, {}); " + tableCapitalized + ".associate = function(models) {   }; return " + tableCapitalized + "; };");
//         writeStream.end();

//         res.send(JSON.stringify({
//             success: "true",
//             message: tableName + " table was successfully synced to a model"
//         }));

//     })

//     /*
//     Documentation
//     get info for this app
//     only viewable on a localhost
//     */


//     app.get('/api/sync/info/app', async (req, res) => {

//         //if not on localhost send unauthorized for this url
//         //this page should not be used in production, only for testing when site should be used.
//         if (keys.BASE_URL !== 'http://localhost:3000') {
//             res.send('unauthorized');
//         }

//         let html = '';
//         /*
//         Documentation
//         app configuration
//         */

//          //get db config vars
//          html += '<h1> Configuration </h1>';
//          html += 'current db name: ' + keys.RDS_DB_NAME + '<br>';
//          html += 'current db user: ' + keys.RDS_USERNAME.substring(0, 3) + '...<br>'
//          html += 'current db host: ' + keys.RDS_HOSTNAME.substring(0, 8) + '...<br>'

//          html += '<br>'

//          html += 'using facebook login: ' + config.appSetup.usingFBLogin + ' <br>'
//          html += 'using google login: ' + config.appSetup.usingGOOGLELogin + ' <br>'
//          html += 'using linked in login: ' + config.appSetup.usingLILogin + ' <br>'

//          html += 'using sendgrid: ' + config.appSetup.usingSendgrid + ' <br>'
//          html += 'using twillio: ' + config.appSetup.usingTwillio + ' <br>'

//          /*
//          Documentation
//          App database
//          */

//         //get db tables in current database
//         const dbTables = await Axios({
//             method: 'get',
//             url: 'http://localhost:5000/api/sync/info/tables',
//         })

//         html += '<h1>Current Db Tables</h1>';


//         //if emtpy send no tables
//         if (!dbTables.data.data) {
//             html += 'Database empty, no tables found.';
//         } else {

//             //loop through tables for results
//             for (let i = 0; i < dbTables.data.data.length; i++) {
               
//                 html += dbTables.data.data[i] + '<br>';
//             }

//         }

       


//         res.send(html);
//     });



//     app.get('/csv/json', async (req, res) => {

//         onError = () => {

//         }

//         onComplete = () => {
           
//         }


//         const csvFilePath='http://aoslabs.xyz/admin/Sanghvi_EXT010_20190313.csv';
//         console.log(csvFilePath)

//         let data =[];
//         let html = '<table style="font-size: 10px"><thead><tr>';        
//         html += '<th style="padding: 5px" />EntryDate</th>';
//         html += '<th style="padding: 5px" />ShortName</th>';
//         html += '<th style="padding: 5px" />Quantity</th>';
//         html += '<th style="padding: 5px" />Price</th>';
//         html += '<th style="padding: 5px" />TradeDate</th>';
//         html += '<th style="padding: 5px" />BuySellCode</th>';
//         html += '<th style="padding: 5px" />Symbol</th>';
//         html += '<th style="padding: 5px" />ShortDescription</th>';
//         html += '<th style="padding: 5px" />PrincipalAmount</th>';
//         html += '<th style="padding: 5px" />SettlementDate</th>';
//         html += '<th style="padding: 5px" />NetCommission</th>';
//         html += '<th style="padding: 5px" />CommissionEntered</th>';
//         html += '<th style="padding: 5px" />FEE1</th>';
//         html += '<th style="padding: 5px" />FEE2</th>';
//         html += '<th style="padding: 5px" />FEE3</th>';
//         html += '<th style="padding: 5px" />FEE4</th>';
//         html += '<th style="padding: 5px" />FEE5</th>';
//         html += '<th style="padding: 5px" />Reallowance</th>';
//         html += '<th style="padding: 5px" />FeeSEC</th>';
//         html += '<th style="padding: 5px" />FeeMisc</th>';
//         html += '<th style="padding: 5px" />CommissionGrossCalculated</th>';
//         html += '<th style="padding: 5px" />CommissionGrossEntered</th>';
//         html += '<th style="padding: 5px" />StateTaxAmount</th>';
//         html += '<th style="padding: 5px" />NetAmount</th>';
//         html += '<th style="padding: 5px" />TradeInterest</th>';
//         html += '<th style="padding: 5px" />CommissionRRCategory</th>';
//         html += '<th style="padding: 5px" />ConstantValueOf1</th>';
//         html += '</tr><thead>';
//         html += '<tbody>';

//         await csv({
//             noheader: true
//         })
//         .fromStream(request.get(csvFilePath))
//         .subscribe((json)=>{
//             return new Promise((resolve,reject)=>{

//                 let dataRow = {
//                     EntryDate: json.field2,
//                     ShortName: json.field3,
//                     Quantity: json.field7,
//                     Price: json.field8,
//                     TradeDate: json.field9,
//                     BuySellCode: json.field13,
//                     Symbol: json.field14,
//                     ShortDescription: json.field15,
//                     PrincipalAmount: json.field16,
//                     SettlementDate: json.field17,
//                     NetCommission: json.field18,
//                     CommissionEntered: json.field19,
//                     FEE1: json.field20,
//                     FEE2: json.field21,
//                     FEE3: json.field22,
//                     FEE4: json.field23,
//                     FEE5: json.field24,
//                     Reallowance: json.field25,
//                     FeeSEC: json.field26,
//                     FeeMisc: json.field27,
//                     CommissionGrossCalculated: json.field28,
//                     CommissionGrossEntered: json.field29,
//                     StateTaxAmount: json.field30,
//                     NetAmount: json.field31,
//                     TradeInterest: json.field32,
//                     CommissionRRCategory: json.field33,
//                     ConstantValueOf1: json.field34,

//                 }

//                 html += '<tr stye="border-bottom: solid 1px #ddd;">';
//                 html += '<td style="padding: 5px" />' + dataRow.EntryDate + '</td>';
//                 html += '<td style="padding: 5px" />' + dataRow.ShortName + '</td>';
//                 html += '<td style="padding: 5px" />' + dataRow.Quantity + '</td>';
//                 html += '<td style="padding: 5px" />' + dataRow.Price + '</td>';
//                 html += '<td style="padding: 5px" />' + dataRow.TradeDate + '</td>';
//                 html += '<td style="padding: 5px" />' + dataRow.BuySellCode + '</td>';
//                 html += '<td style="padding: 5px" />' + dataRow.Symbol + '</td>';
//                 html += '<td style="padding: 5px" />' + dataRow.ShortDescription + '</td>';
//                 html += '<td style="padding: 5px" />' + dataRow.PrincipalAmount + '</td>';
//                 html += '<td style="padding: 5px" />' + dataRow.SettlementDate + '</td>';
//                 html += '<td style="padding: 5px" />' + dataRow.NetCommission + '</td>';
//                 html += '<td style="padding: 5px" />' + dataRow.CommissionEntered + '</td>';
//                 html += '<td style="padding: 5px" />' + dataRow.FEE1 + '</td>';
//                 html += '<td style="padding: 5px" />' + dataRow.FEE2 + '</td>';
//                 html += '<td style="padding: 5px" />' + dataRow.FEE3 + '</td>';
//                 html += '<td style="padding: 5px" />' + dataRow.FEE4 + '</td>';
//                 html += '<td style="padding: 5px" />' + dataRow.FEE5 + '</td>';
//                 html += '<td style="padding: 5px" />' + dataRow.Reallowance + '</td>';
//                 html += '<td style="padding: 5px" />' + dataRow.FeeSEC + '</td>';
//                 html += '<td style="padding: 5px" />' + dataRow.FeeMisc + '</td>';
//                 html += '<td style="padding: 5px" />' + dataRow.CommissionGrossCalculated + '</td>';
//                 html += '<td style="padding: 5px" />' + dataRow.CommissionGrossEntered + '</td>';
//                 html += '<td style="padding: 5px" />' + dataRow.StateTaxAmount + '</td>';
//                 html += '<td style="padding: 5px" />' + dataRow.NetAmount + '</td>';
//                 html += '<td style="padding: 5px" />' + dataRow.TradeInterest + '</td>';
//                 html += '<td style="padding: 5px" />' + dataRow.CommissionRRCategory + '</td>';
//                 html += '<td style="padding: 5px" />' + dataRow.ConstantValueOf1 + '</td>';
//                 html += '</tr>';

//                 data.push(dataRow);
//                 resolve();
//             })
//         },onError,onComplete);

//         html += '</tbody></table>';

//         // console.log(data)
//         console.log(data[0])
//         res.send(html)

//     });


// };