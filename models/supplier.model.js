const mongoose = require('mongoose');




const customerSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    supplierName: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minlength: 3,
        maxlength: 50,
    },
    supplierEmail: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        minlength: 5,
        maxlength: 255,
    },
    supplierPhone: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 50,
    },
    supplierAddress: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255,
    },
    supplierDescription: {
        type: String,
        required: true,
        trim: true,
       
    },
    
    date: {
        type: Date,
        default: Date.now,
    },
});
    

module.exports = mongoose.model('Supplier', customerSchema);