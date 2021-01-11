/*********************************************
** DONT COMMIT THIS FILE TO VERSION CONTROL **
*********************************************/


module.exports = {

    BASE_URL: '',

    RDS_HOSTNAME: process.env.RDS_HOSTNAME,
    RDS_DB_NAME: process.env.RDS_DB_NAME,
    RDS_USERNAME: process.env.RDS_USERNAME,
    RDS_PASSWORD: process.env.RDS_PASSWORD,
    RDS_PORT: process.env.RDS_PORT,

    MONGO_URI: process.env.MONGO_URI,

    //our passport cookie hash
    COOKIE_KEY: 'eidjdyehdydhasdf',

    S3_SECRET_ACCESS_KEY: process.env.S3_SECRET_ACCESS_KEY,
    S3_ACCESS_KEY_ID: process.env.S3_ACCESS_KEY_ID,

    SENDBIRD_APP_ID: process.env.SENDBIRD_APP_ID,
    SENDBIRD_API_TOKEN: process.env.SENDBIRD_API_TOKEN,

    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,

    INFUSION_APP_ID: process.env.INFUSION_APP_ID,
    INFUSION_SECRET_KEY: process.env.INFUSION_SECRET_KEY,

    LINKEDIN_CLIENT_ID: process.env.LINKEDIN_CLIENT_ID,
    LINKEDIN_SECRET: process.env.LINKEDIN_SECRET,

    FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID,
    FACEBOOK_SECRET: process.env.FACEBOOK_SECRET,

    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,

    TWILIO_SID: process.env.TWILIO_SID,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,

    STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_SIGNING_SECRET: process.env.STRIPE_SIGNING_SECRET,
}