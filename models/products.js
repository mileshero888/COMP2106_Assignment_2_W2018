const mongoose = require('mongoose');
require('mongoose-double')(mongoose);

var SchemaTypes = mongoose.Schema.Types;
const makeSchema = new mongoose.Schema({
    'ProductName': {
        type: String,
        required: 'Product Name is required'
    },
    'Price': {
        type: Number,
        required: 'Product Price is required'
    },
    'Description': {
        type: String,
        required: 'Product Description is Required'
    }
});

module.exports = mongoose.model('Products', makeSchema);