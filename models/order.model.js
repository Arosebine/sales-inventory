const mongoose = require('mongoose');





const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    supplier:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier'
    },
    productQuantity: {
        type: Number,
        required: true,
        trim: true
    },
});
