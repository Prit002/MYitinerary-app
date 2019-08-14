const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
const bodyParser = require('body-parser')
const async = require('async');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var router = express.Router();
const User = require('./models/User');
//  Passpost setp initialize......
const passportSetup = require('./client/googlePassport/passport');
const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());

MongoClient.connect('mongodb+srv://preeti123:nether123@mern-fy1ul.gcp.mongodb.net/test?retryWrites=true',{ useNewUrlParser: true }, (err, db) => {
    // ... start the server
    var dbase = db.db("MYtinerary");
    if (err) return console.log(err)
  

 router.get('/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }));
    router.get('/google/redirect', (req, res, next) => {
      return passport.authenticate('google', (req) => {
          console.log("the google auth is working!")
          console.log(req)
          const username = req.username;
          const email = req.email;
          if (!username)
              return res.send({
                  success: false,
                  message: 'Error. Username is empty'
              })
          if (!email)
              return res.send({
                  success: false,
                  message: 'Error. Email is empty'
              })
          dbase.collection("user").find({ "email": email, "provider": 'Google' }).toArray((err, result) => {
              let previousUsers = result.filter(user => user.email === email);
              console.log(previousUsers.length)
              if (err)
                  return res.send({
                      success: false,
                      message: 'Error. Server error'
                  })
              if (previousUsers.length == 0) {
                  dbase.collection("user").save(req, (err, result) => {
                      if (err) {
                          return res.send({
                              success: false,
                              message: 'Error. Server error'
                          })
                      }
                      const userSession = new UserSession();
                      userSession.userId = selectedUser[0]._id;
                      dbase.collection("userSession").save(userSession, (err, doc) => {
                          if (err) {
                              return res.send({
                                  success: false,
                                  message: 'Error: server error'
                              });
                          }
                          dbase.collection("userSession").findOneAndUpdate({ "userId": userSession.userId }, {
                              $set: {
                                  isLogged: true,
                              }
                          },
                              null,
                              (err, response) => {
                                  if (err) {
                                      return res.send({
                                          success: false,
                                          message: "Server error"
                                      })
                                  } else {
                                      return res.send({
                                          success: true,
                                          message: "User is updated!",
                                          token: userSession.userId,
                                      })
                                  }
                              })
                      });
                  })
              }
              else {
                  dbase.collection("user").findOne({
                      id: req.id,
                      provider: 'Google'
                  }, (req, user) => {
                  })
              }
          });
      })(req, res, next)
  })
});