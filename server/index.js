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

MongoClient.connect('mongodb+srv://preeti123:nether123@mern-fy1ul.gcp.mongodb.net/test?retryWrites=true', (err, db) => {
    // ... start the server
    var dbase = db.db("MYtinerary");
    if (err) return console.log(err)
    app.listen(8080, function () {
        console.log('listening on 8080');
    })

    router.get('/cities', (req, res) => {
        dbase.collection('cities').find().toArray((err, results) => {
            if (err)
                return res.send({
                    success: false,
                    message: "Error:Server Error"
                })
            return res.send({
                success: true,
                data: results
            })
        });
    });

    const itinerariesCollection = dbase.collection('itineraries');
    const citiesCollection = dbase.collection('cities');
    router.get('/itineraries/:city', (req, res) => {
        const city = req.params.city;

        var itineraries = {};


        var tasks = [

(callback) => {
        itinerariesCollection.find({"ref": city}).toArray((err, results) => {
                if (err)
                    return callback(err);
                    itineraries.itineraries = results;
                    callback();
            
            });
        },
    function(callback) {
        citiesCollection.find({"ref": city}).toArray((err, resultsTwo) => {
            if (err)
                return callback(err);
                itineraries.cities = resultsTwo;
                callback();
        
        });
    },
    ];
    async.parallel(tasks, function(err){
        if(err)
        return err;
        return res.send(itineraries)
    })

    });


    router.post('/user', (req, res, next) => {
        const { body } = req;
        const {
            firstname,
            lastname,
            username,
            password,
            country,
        } = body;
        let {
          email
        } = body;
        console.log(req)
        if (!username) {
            return res.send({
              success: false,
              message: 'Error: username cannot be blank.'
            });
          }
        if (!firstname) {
            return res.send({
              success: false,
              message: 'Error: firstname cannot be blank.'
            });
          }
          if (!lastname) {
            return res.send({
              success: false,
              message: 'Error: lastname cannot be blank.'
            });
        }
        if (!email) {
          return res.send({
            success: false,
            message: 'Error: Email cannot be blank.'
          });
        }
        if (!password) {
          return res.send({
            success: false,
            message: 'Error: Password cannot be blank.'
          });

        }
        email = email.toLowerCase();
        email = email.trim();
        // Steps:
        // 1. Verify email doesn't exist
        // 2. Save
        // console.log(hello)
        const user = dbase.collection('user');
        user.find({
          email: email
        }, (err, previousUsers) => {
          if (err) {
            return res.send({
              success: false,
              message: 'Error: Server error'
            });
          } 
          else if (previousUsers.length > 0) {
            // email already exits
            return res.send({
              success: false,
              message: 'Error: Account already exist.'
            });
          }
          // Save the new user
          const newUser = new User();
          newUser.firstname = firstname;
          newUser.lastname = lastname;
          newUser.username = username;
          newUser.email = email;
          newUser.country = country;
          newUser.password = newUser.generateHash(password);
          user.save(newUser,(err, doc) => {
            if (err) {
            
              return res.send({
                success: false,
                message: 'Error: Server error'
              });
            }
            return res.send({
              success: true,
              message: 'Signed up'
            });
          });
        });
      }); // end of sign up endpoint

    router.post('/signin', (req, res, next) => {
        const { body } = req;
        const {
            password,
        } = body;
        let {
          email
        } = body;
        // console.log(body)
        if (!email) {
            return res.send({
              success: false,
              message: 'Error: Email cannot be blank.'
            });
          }
          if (!password) {
            return res.send({
              success: false,
              message: 'Error: Password cannot be blank.'
            });
            }
            email = email.toLowerCase();
            email = email.trim();
            
            const user = dbase.collection('user');
            user.findOne({
            email: email
        }, (err, users) => {
          if (err) {
            return res.send({
              success: false,
              message: 'Error: Server error'
            });
          } 
          if (users == null) {
            return res.send({
              success: false,
              message: 'Error: User not found'
            });
          }
          let user = new User(users)
          // let validPassword = user.generateHash(password)
          // console.log(user)

          console.log(user.validPassword(password))
          if(!user.validPassword(password)){
            return res.send({
                success: false,
                message: 'Error: Invalid password.'
            });
        }
        // user.userId = user._id;
        return res.send({
                  success: true,
                      message: 'Valid sign in.',
                      token: users._id
              });
    });
      });

    router.get('/verify', (req, res, next) => {
      // Get a token
      const {query} = req;
      const {token} = query;

     // ?token=test
    // Verify the token is one of a kind and it's not deleted.
    const user = dbase.collection('user');
    user.findOne({
      _id: ObjectID(token),
      isDeleted: false

    }, (err, sessions) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      }
      
      if (sessions == null) {
        return res.send({
          success: false,
          message: 'Error: User not found'
        });
      } else {
      return res.send({
        success: true,
        message: 'Good'
      });
    }
    });
  });

  router.get('/logout', (req, res, next) => {
    // Get the token
    const { query } = req;
    const { token } = query;
    // ?token=test

    // Verify the token is one of a kind and it's not deleted.
    const user = dbase.collection('user');
    user.findOneAndUpdate({
      _id: ObjectID(token),
      isDeleted: false
    },
     {
      $set: {
        isDeleted:true
      }
       
    }, null, (err, sessions) => {
      if (err) {
        console.log(err);
         
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
         
      }
      return res.send({
        success: true,
        message: 'Good'
      });
    });  
  
  });
  
    app.use('/api', router)
});