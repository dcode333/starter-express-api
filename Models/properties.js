const mongoose = require('mongoose');

const schema = mongoose.Schema({
    PropertyId: {
        type: String, 
    },
    Description: {
        type: String,  
    },
    PriceOld: { 
        type: String,        
    },
    PriceNew: {
        type: String,
    },
    UpdatedOn: {
        type: String, 
    },
    Reference: {
        type: String, 
    },
});

const realEstateData = mongoose.model('realEstateData', schema);
module.exports = realEstateData;
