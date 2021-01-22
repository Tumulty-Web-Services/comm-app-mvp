require('dotenv').config();
/*
Documentation

later make test accounts for all of these so we have once centralize testing environment

*/

module.exports = {


    MONGO_URI: process.env.MONGO_URI,

    /*
    Documentation
    COOKEI KEY HASH, ANY RANDOM STRING
    */
    COOKIE_KEY: process.env.COOKIE_KEY,

    /*
    Documentation
    PAYMENTS
    */

    STRIPE_PUBLISHABLE_KEY: '',
    STRIPE_SECRET_KEY: '',
    STRIPE_SIGNING_SECRET: '',

    /*
    Documentation
    AUTH LOGINS
    */

    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,



    // LINKEDIN_CLIENT_ID: '78bqrekpej4xkd',
    // LINKEDIN_SECRET: 'MU3YoYtogUZFLI1V',


    /*
    Documentation
    AWS
    */
    S3_SECRET_ACCESS_KEY: process.env.S3_SECRET_ACCESS_KEY,
    S3_ACCESS_KEY_ID: process.env.S3_ACCESS_KEY_ID,


    /*
    Documentation
    EMAIL
    */
    SENDGRID_API_KEY: '',


    /*
    Documentation
    PHONE / TET
    */
    // TWILIO_SID: '',
    // TWILIO_AUTH_TOKEN: '',

    /*
    Documentation
    MARKETING
    */


//    INFUSION_APP_ID: '',
//    INFUSION_SECRET_KEY: '',

//    FITBIT_CLIENT_ID: '22DK5C',
//     FITBIT_CLIENT_SECRET: '74989b6832c978dec5cc6d35952b88b3',

}