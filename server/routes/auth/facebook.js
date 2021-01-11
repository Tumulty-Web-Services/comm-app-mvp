/*
Documentation

This file holds the routes and passport stategy for facebook logins



*/

const FacebookStrategy = require('passport-facebook').Strategy;



const mongoose = require('mongoose');
const User = mongoose.model('users');
const CommModules = mongoose.model('comm_modules');
const passport = require('passport');

const runStateLogin = require('./functions/logic-state');

const keys = require('../../../keys');

//allow passport to use facebook
passport.use(new FacebookStrategy({
  profileFields: ['id', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'photos', 'verified'],

  clientID: keys.FACEBOOK_APP_ID,
  clientSecret: keys.FACEBOOK_SECRET,
  callbackURL: "/auth/facebook/callback",
  proxy: true // helps with http / https on heroku servers
}, async (accessToken, refreshToken, profile, done) => {

  // console.log(profile);

  const facebook_id = profile.id;

  const given_name = profile.name.givenName;
  const family_name = profile.name.familyName;

  const email = profile.emails[0].value;
  const picture_url = profile.photos[0].value


  //see if we have a user by their facebook_id
  const foundUser = await User.findOne({facebook_id});


  if(foundUser) {
    return done(null, foundUser);
  } else {

    // //no user found create a new one
    // const createdUser = await db.users.create({ family_name, givenName, email, facebook_id, picture_url })
    // return done(null, createdUser)

    const newUser = await new User({
      facebook_id,
      given_name,
      family_name,
      email,
      picture_url
  }).save();

  //create blank module set for new users
  await new CommModules({
      user_id: newUser._id,
      module_1: {
          key: '1.1'
      },
      module_2: {
          key: '1.2'
      },
      module_3: {
          key: '1.3'
      },
      module_4: {
          key: '2.1'
      },
      module_5: {
          key: '2.2'
      },
      module_6: {
          key: '2.3'
      },
      module_7: {
          key: '3.1'
      },
      module_8: {
          key: '3.2'
      },
      module_9: {
          key: '3.3'
      },
      module_10: {
          key: '4.1'
      },
      module_11: {
          key: '4.2'
      },
      module_12: {
          key: '4.3'
      },
  }).save();
 
  done(null, newUser);

  }
 

}));

module.exports = (app) => {



  // app.get('/auth/facebook', passport.authenticate('facebook'));
  // app.get('/auth/facebook',passport.authenticate('facebook', {authType: 'rerequest',scope: [ 'email', 'public_profile'],}));

  app.get(`/auth/facebook`, (req, res, next) => {

    //check for any params passed in and store in state
    //state must be a string separate string parts by "|" key value pairs by "_" and 

    let state = '';

    if (req.query.cid) {
        state += !state ? 'cid_' + req.query.cid : '|cid_' + req.query.cid
    }

    if (req.query.redirect) {
        state += !state ? 'redirect_' + req.query.redirect : '|redirect_' + req.query.redirect
    }

    const authenticator = passport.authenticate('facebook', {
        authType: 'rerequest',
        scope: [ 'email', 'public_profile'],
        state
    })
    authenticator(req, res, next)
})


  app.get('/auth/facebook/callback', passport.authenticate('facebook', {

    //where to send users after a failture
    failureRedirect: '/login'
    
}), async function (req, res) {

    const returnedLogic = await runStateLogic(req.user, req, res);


    res.redirect(returnedLogic.redirect);

});

//   app.get('/auth/facebook/callback',  passport.authenticate('facebook', {

//     //where to send users after a failture
//     failureRedirect: '/login' 
//    }), function(req, res) {
//    // Successful authentication, redirect home.


//     req.login(req.user, function(error) {

//       if(error) {
//         console.log(error)
//       } else {
//         res.redirect('/dashboard');
//       }
//     });

   


// });


};

