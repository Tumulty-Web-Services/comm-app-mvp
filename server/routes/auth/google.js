const mongoose = require('mongoose');

const User = mongoose.model('users');
const CommModules = mongoose.model('comm_modules');
const passport = require('passport');

const runStateLogin = require('./functions/logic-state');

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../../../keys');

const Axios = require('axios');

passport.use(new GoogleStrategy({
  clientID: keys.GOOGLE_CLIENT_ID,
  clientSecret: keys.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback',
  proxy: true, // helps with http / https on heroku servers
}, async (accessToken, refreshToken, profile, done) => {
  const google_id = profile.id;

  const given_name = profile.name.givenName;
  const family_name = profile.name.familyName;

  const email = profile.emails[0].value;
  const picture_url = profile.photos[0].value;

  const foundUser = await User.findOne({ google_id });

  if (foundUser) {
    done(null, foundUser);
  } else {
    const newUser = await new User({
      google_id,
      given_name,
      family_name,
      email,
      picture_url,
    }).save();

    // create blank module set for new users
    await new CommModules({
      user_id: newUser._id,
      module_1: {
        key: '1.1',
      },
      module_2: {
        key: '1.2',
      },
      module_3: {
        key: '1.3',
      },
      module_4: {
        key: '2.1',
      },
      module_5: {
        key: '2.2',
      },
      module_6: {
        key: '2.3',
      },
      module_7: {
        key: '3.1',
      },
      module_8: {
        key: '3.2',
      },
      module_9: {
        key: '3.3',
      },
      module_10: {
        key: '4.1',
      },
      module_11: {
        key: '4.2',
      },
      module_12: {
        key: '4.3',
      },
    }).save();

    done(null, newUser);
  }
}));

module.exports = (app) => {
  app.get('/auth/google', (req, res, next) => {
    // check for any params passed in and store in state
    // state must be a string separate string parts by "|" key value pairs by "_" and

    let state = '';

    if (req.query.cid) {
      state += !state ? `cid_${req.query.cid}` : `|cid_${req.query.cid}`;
    }

    if (req.query.redirect) {
      state += !state ? `redirect_${req.query.redirect}` : `|redirect_${req.query.redirect}`;
    }

    const authenticator = passport.authenticate('google', {
      authType: 'rerequest',
      scope: ['profile', 'email'],
      state,
    });
    authenticator(req, res, next);
  });

  app.get('/auth/google/callback', passport.authenticate('google', {

    // where to send users after a failture
    failureRedirect: '/login',

  }), async (req, res) => {
    const returnedLogic = await runStateLogic(req.user, req, res);

    res.redirect(returnedLogic.redirect);
  });
};
