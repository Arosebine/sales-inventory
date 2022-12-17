const mongoose = require('mongoose');





const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        trim: true,
        minlength: 3,       
        maxlength: 50,
    },
    last_name: {
        type: String,
        trim: true,
        minlength: 3,
        maxlength: 50,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: 3,
        maxlength: 50,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 5000,
    },
    phone_number: {
        type: String,
        trim: true,
        minlength: 3,
        maxlength: 50,
    },
    address: {
        type: String,
        trim: true,
        minlength: 3,
        maxlength: 50,
    },
    role: {
        type: String,
        enum: ['student', 'admin'],
        default: 'student'
    }

},
{
    timestamps: true,
}
);




module.exports = mongoose.model('User', userSchema);