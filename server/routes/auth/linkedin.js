/*
Documentation

This file holds all the routes for our internal api on the Users table
when creating new CRUD routes for a new table, start by copying this file.

then:
1) change routeName to new route name
2) change modelName to match a new model name

*/

const passport = require('passport');
const db = require('../../../models');
const runStateLogin = require('./functions/logic-state');
// const User = db.User;

// const passport = require('passport');

// get the passport strategy specifically for linked in
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
// get keys file
const keys = require('../../../keys');

let CallbackURL = '';

if (process.env.NODE_ENV === 'production') {
  CallbackURL = 'https://sheltered-lake-19908.herokuapp.com/auth/linkedin/callback';
} else {
  CallbackURL = '/auth/linkedin/callback';
}

passport.use(new LinkedInStrategy({
  clientID: keys.LINKEDIN_CLIENT_ID,
  clientSecret: keys.LINKEDIN_SECRET,
  callbackURL: CallbackURL,
  profileFields: [
    'id',
    'first-name',
    'last-name',
    'email-address',
    'headline',
    'summary',
    'industry',
    'picture-url',
    'positions',
    'public-profile-url',
    'location',
  ],
  scope: ['r_emailaddress', 'r_basicprofile'],
}, async (accessToken, refreshToken, profile, done) => {
  const { family_name } = profile.name;
  const { givenName } = profile.name;

  const linkedinId = profile.id;
  const email = profile.emails[0].value;
  const background = profile._json.summary;
  const form_started = Math.round((new Date()).getTime() / 1000);

  let picture_url = '';

  if (profile.photos[0]) {
    picture_url = profile.photos[0].value;
  }

  // think linked in error is here

  const existingUser = await db.users.findOne({ where: { linkedinId } });

  if (existingUser) {
    return done(null, existingUser);
  }

  const createdUser = await db.users.create({
    family_name, givenName, email, linkedinId, picture_url, background, form_started,
  });
  return done(null, createdUser);
}));

module.exports = (app) => {
  app.get('/auth/linkedin', (req, res, next) => {
    // check for any params passed in and store in state
    // state must be a string separate string parts by "|" key value pairs by "_" and

    let state = '';

    if (req.query.cid) {
      state += !state ? `cid_${req.query.cid}` : `|cid_${req.query.cid}`;
    }

    if (req.query.redirect) {
      state += !state ? `redirect_${req.query.redirect}` : `|redirect_${req.query.redirect}`;
    }

    const authenticator = passport.authenticate('linkedin', { state });
    authenticator(req, res, next);
  });

  app.get('/auth/linkedin/callback', (req, res, next) => {
    passport.authenticate('linkedin', async (err, user, info) => {
      // if we have an error console log it if its not that they just cancelled
      if (err) {
        if (err.message !== 'The user cancelled LinkedIn login') {
          // res.send(JSON.stringify({'error message': err, 'user info': user, 'info message': info}))

        }

        // send a user back to login
        res.redirect('/login');
      }

      // if we dont have a user send back to login
      if (!user) {
        // res.send(JSON.stringify({'error message': err, 'user info': user, 'info message': info}))

        res.redirect('/login');
      }

      const returnedLogic = await runStateLogic(user, req, res);

      if (returnedLogic.redirect === '/login') {
        res.redirect('/login');
      }

      req.login(user, (error) => {
        if (error) {
          console.log(error);
        } else {
          res.redirect(returnedLogic.redirect);
        }
      });
    })(req, res, next);
  });
};
