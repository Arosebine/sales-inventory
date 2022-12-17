const mongoose = require('mongoose');





const purchaseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    productId: {
        type: String,
    },
    productName: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minlength: 3,
        maxlength: 500,
        },
    sku: {
            type: String,
            trim: true,
           
        },
    productCostPrice: {
        type: mongoose.Decimal128,
        required: true,      
        default: 0.0
        },
    productQuantity: {
        type: mongoose.Decimal128,
        required: true, 
        trim: true,
        default: 0,
        },   
    productDescription: {
        type: String,
        
        },
    productImage: {
        type: String,
        trim: true,
       
        },
    productCategory: {
        type: String,
        trim: true,
        lowercase: true,
        
        },
  

},
{
    timestamps: true,
}
);



module.exports = mongoose.model('Purchase', purchaseSchema);