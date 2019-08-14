const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../../models/User');

passport.use(
    new GoogleStrategy({
        // option for google start
        callbackURL:'http://localhost:3000/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,

    }, (accessToken, refreshToken, profile, done) => {
           // passport call back function
        console.log("passport callback function fired")
        // console.log('profile', profile)
        const user = new User({
            username: profile.displayName,
            email: profile.emails[0].value,
            id: profile.id,
            provider: 'Google',
            photo: profile.photos[0].value,

        })
        console.log('user', user)
        return done(user)
    }
))