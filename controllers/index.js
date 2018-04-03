const express = require('express');
const router = express.Router();
const Product = require('../models/products');

// auth references
const passport = require('passport');
const User = require('../models/user');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', {
    title: 'Buzz Ads',
    message: 'Buzz Ads - Classified Ads Application',
      user: req.user
  });
});


// GET: /products
router.get('/shop', (req, res, next) => {
    // get make documents from db
    Product.find((err, products) => {
        if (err) {
            console.log(err);
        }
        else {
            res.render('shop', {
                title: 'Buzz Ads - Shop',
                products: products,
                user: req.user
            });
        }
    });
});

// GET: /about
router.get('/about', (req, res, next) => {
  // load the about view
    res.render('about', {
      title: 'About Buzz Ads',
        message: 'This app is built with the MEAN Stack. Its Classified Ads Web Application',
        user: req.user
    });
});

// GET: /contact
router.get('/contact', (req, res, next) => {
  res.render('contact', {
    title: 'Contact Us',
      message: 'Here is how to reach us...',
      user: req.user
  });
});

// GET: /register
router.get('/register', (req, res, next) => {
   res.render('register', {
     title: 'Register',
       user: req.user
   });
});

// POST: /register
router.post('/register', (req, res, next) => {
  // create the new User with our model
    User.register(new User({
        username: req.body.username,
        phone: req.body.phone
    }), req.body.password, (err, user) => {
      if (err) {
        console.log(err);
      }
      else {
        // automatically log the user in and direct to /cars
          /*req.login(user,  (err) => {
            res.redirect('/cars')
          })*/
          res.redirect('/login');
      }
    });
});

// GET: /login
router.get('/login', (req, res, next) => {
    // check for invalid login message in the session object
    let messages = req.session.messages || [];

    // clear the session messages
    req.session.messages = [];

    res.render('login', {
        title: 'Login',
        messages: messages,
        user: req.user
    });
});

// POST: /login
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
    failureRedirect: '/login',
    failureMessage: 'Invalid Login'
}));

// GET: /logout
router.get('/logout', (req, res, next) => {

    // clear out any session messages
    req.session.messages = [];

    // end the user's session
    req.logout();

    // redirect to login or home
    res.redirect('/login');
});

// GET: /google
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

// GET: /google/callback
router.get('/google/callback', passport.authenticate('google', {
    // failed google auth
    failureRedirect: '/login',
    failureMessage: 'Invalid Login',
    scope: 'email'
}),
    // successful google auth
    (req, res, next) => {
       res.redirect('/');
    }
);
//var passportLinkedIn = require('../auth/linkedin');
router.get('/auth/linkedin', passport.authenticate('linkedin'));

router.get('/auth/linkedin/callback',
  passport.authenticate('linkedin', { failureRedirect: '/login',failureMessage: 'Invalid Login' }),
  function(req, res) {
    // Successful authentication
    //res.json(req.user);
    res.redirect('/');
  });


module.exports = router;
