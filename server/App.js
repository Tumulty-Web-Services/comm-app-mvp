const keys = require('../keys');

const bodyParser = require('body-parser');
const express = require('express');
const cookieSession = require('cookie-session');

const passport = require('passport');

const glob = require('glob');
const path = require('path');

const mongoose = require('mongoose');

//Require all files (mongoose models) in ./db/models folder.
glob.sync('./server/db/models/*.js').forEach(function (file) {
    require(path.resolve(file));
});

//create a new express app
const app = express();


//use this line to test for bad database connection on the app
// mongoose.connect('asdfasf', function (err, db) {


//connect to MongoDb | useNewUrlParser is to avoid depreciation warning
mongoose.connect(keys.MONGO_URI, { useNewUrlParser: true }, function (err, db) {

    //if we had a connection error
    if (err) {

        //console.log the error
        console.log('Unable to connect to the mongoDB server.');
        console.log(err);

        //tell our frontend server went wrong
        app.get('/api/is_connected', async (req, res) => {
            //send error back as string
            res.send({connected: false, message: err.toString()})
        })

    } else {

        //we are successfully connected
        console.log('Connected to mongo server');

        //tell our front end we are connected
        app.get('/api/is_connected', async (req, res) => {
            res.send({connected: true})
        })

        /////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////
        //Proceed with the rest of the app
        /////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////

        const User = mongoose.model('users');
        passport.serializeUser((user, done) => {
            done(null, user.id);
        });

        //id is the user.id that was passed into serializeUser's done function
        passport.deserializeUser(async(id, done) => {

            //find our user
            const foundUser = await User.findById(id)

            done(null, foundUser)

        });


        app.use(cookieSession({
            //set cookie to last 30 days
            maxAge: 30 * 24 * 60 * 60 * 1000,
            keys: [keys.COOKIE_KEY]
        }));

        //app.use adds middleware for every route handler
        app.use(passport.initialize());
        app.use(passport.session());

        /*
        Documentation
        require twillio first as it needs a different body parser
        */

        // if we are using twillio 
        // require('./routes/external/twilio')(app); }

        app.use(bodyParser.json());


        require('./routes/system')(app);
        require('./routes/db/articles')(app);
        require('./routes/db/crud')(app);
        require('./routes/db/schema')(app);
        // require('./routes/db/sync')(app);
        require('./routes/db/lessons')(app);
        require('./routes/db/contact_forms')(app);
        require('./routes/db/payments')(app);
        require('./routes/db/comments')(app);
        require('./routes/db/modules')(app);
        require('./routes/db/comm_modules')(app);

        require('./routes/external/aws_s3')(app);
        require('./routes/external/sendgrid')(app);

        require('./routes/auth/facebook')(app);
        require('./routes/auth/google')(app);
        require('./routes/auth/utility')(app);

        require('./routes/external/stripe')(app);

    }

    if (process.env.NODE_ENV === 'production') {
        // express will serve up production assets like main.js or main.css file
        const path = require('path');
        app.use(express.static('client/build'));
    
        // express wil serve up the index.html file if it doesn't recognize route this
        // can also send the 404 page
    
        app.get('*', (req, res) => {
    
            const pathToDirectory = path.join(__dirname, '../');;
    
            res.sendFile(path.resolve(pathToDirectory + '/client/build/index.html'));
        });
    
    }

    // mongoose.disconnect();

});




module.exports = app;