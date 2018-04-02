// references
const express = require('express');
const router = express.Router();
const Product = require('../models/products');

// GET: /products
router.get('/',loggedIn, (req, res, next) => {
    // get make documents from db
    Product.find((err, products) => {
        if (err) {
            console.log(err);
        }
        else {
            res.render('products/index', {
                title: 'Products List',
                products: products,
                user: req.user
            });
        }
    });
});

// GET: /products/add
router.get('/add',loggedIn, (req, res, next) => {
    res.render('products/add', {
        title: 'Add a New Product',
        user: req.user
    });
});

// POST: /products/add
router.post('/add',loggedIn, (req, res, next) => {
    // use the Make model to save the new maket
    Product.create({
        ProductName: req.body.ProductName,
        Price: req.body.Price,
        Description: req.body.Description
    }, (err, product) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/products');
        }
    }) ;
});

// GET: /makes/delete/abc123
router.get('/delete/:_id',loggedIn, (req, res, next) => {
    // get the _id parameter from the url and store in a local variable
    let _id = req.params._id;

    // use the Make model to delete the document with this id
    Product.remove({ _id: _id }, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/products');
        }
    });
});

// GET: /makes/edit/abc123
router.get('/edit/:_id',loggedIn, (req, res, next) => {
    // get _id param from url
    let _id = req.params._id;

    // use the Make model to find the selected document
    Product.findById(_id, (err, product) => {
        if (err) {
            console.log(err);
        }
        else {
            res.render('products/edit', {
                title: 'Product Details',
                product: product,
                user: req.user
            });
        }
    });
});

// POST: /makes/edit/abc123
router.post('/edit/:_id',loggedIn, (req, res, next) => {
    // get the _id from the url
    let _id = req.params._id;

    // use the Mongoose update method to set all the new values
    Product.update({ _id: _id },
        { $set: {
                ProductName: req.body.ProductName,
                Price: req.body.Price,
                Description: req.body.Description
            }}, null, (err) => {
            if (err) {
                console.log(err);
            }
            else {
                res.redirect('/products');
            }
        });
});

function loggedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/login');
    }
}

// make public
module.exports = router;