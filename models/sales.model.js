const mongoose = require('mongoose');



const saleSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    productName: {
        type: String,
    },
    price: {
        type: mongoose.Decimal128,
        default: 0.0
    },
    productQuantity: {
        type: mongoose.Decimal128,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});




module.exports = mongoose.model('Sale', saleSchema);
