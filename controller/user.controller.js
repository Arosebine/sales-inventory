const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { trusted } = require('mongoose');





// Create and Save a new User

exports.createUser = async (req, res) => {
    try {
        const { first_name, last_name, email, password, phone_number, address } = req.body;
        // validate user
        if (!(email && password && first_name && last_name && phone_number && address)) {
            res.status(400).send("All input is required");
        }
        // check if user already exist
        // validate if user exist in our database
        const userExist = await User.findOne({
            email
        });
        if (userExist) {
            return res.status(400).send("User already exist");
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            first_name,
            last_name,
            email,
            password: hashedPassword,
            phone_number,
            address,
        });
        res.status(201).send(user)
    } catch (error) {
        res.status(400).send(error)
        console.log(error);
    }
};


exports.userLogin = async (req, res) => {
  const { password, email } = req.body;
  try {
    // validation
    if (!(password && email)) {
      return res.status(400).send({ message: 'Please fill all fields' });
    }
    // check if user exist in database
    const checkUser = await User.findOne({ email: email });
    // if user doesn't exist throw error
    if (!checkUser) {
      return res.status(404).send({ message: 'user not found' });
    }
   
    // if user exist in database, check if user password is correct
    const checkPassword = await bcrypt.compare(password, checkUser.password);
    // if user password is not correct throw error ==> invalid credentials
    if (!checkPassword) {
      return res.status(400).send({ message: 'invalid credentials' });
    }
    // if user password is correct tokenize the payload
    const payload = {
      _id: checkUser._id,
    };
    const token = await jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: '2d',
    });
    // store token in cookie ====> web browser local storage
    res.cookie('access-token', token);
    return res
      .status(202)
      .send({ message: 'User logged in successfully', token: token, user: checkUser });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ error: error.message, message: 'internal server error' });
  }
};


// to view all users 

exports.viewUsers = async (req, res)=>{
  try {
    const id = req.user._id;

    const users = await User.findOne({ userId: id })
    if(users.role === "admin" ){
      res.status(501).send('You are not authorized as Admin')
    };
    const existUsers = await User.find();
    res.status(200).send(existUsers)  
  } catch (error) {
    
  }
};


// to update a user? 

exports.updateUser = async (req, res)=>{
  try {
    const id = req.user._id;
    const userId = await User.findOne({ userId: id })
    if(userId.role === "admin" ){
      res.status(501).send('You are not authorized as Admin')
    }; 
    const update = {
      first_name: req.params.first_name,
      last_name: req.params.last_name,
      password: req.params.password,
      phone_number: req.params.phone_number,
      address: req.params.address,}   
    const user = await User.findByIdAndUpdate({
      _id: id
    },
    {$set: update },
    {
      new: true
    },
    );
    res.status(200).send(user)
    console.log(user);

  } catch (error) {
    res.status(500).send({ error: error.message })
  }
};


// to delete a user? 

exports.deleteUser = async (req, res)=>{
  try {
    const id = req.params.id;
    const user = await User.findOne({ _id: id })
    if(!user){
      res.status(404).send('User not found')
    };
    const existUsers = await User.findByIdAndDelete(
      { _id: id },
      );
      res.status(200).send(existUsers, "user deleted successfully");


  } catch (error) {
    res.status(500).send({ error: error.message });
    
  }
};




exports.switchAdmin = async (req, res) => {
  try {
    // role    
    const id = req.params.id;
    // validate user role 
    const userRole = await User.findOne
    ({ _id: id });
    if(!userRole.role === "admin"){
      return res.status(400).send({ message: '  You are not authorized' });
    }
    // update user role   
    const user = await User.findByIdAndUpdate(
      id,
      {
       $set: { role:  'admin'}
      },
      { new: true }
    );
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: error.message.kind, message: 'internal server error' });
  }
};


