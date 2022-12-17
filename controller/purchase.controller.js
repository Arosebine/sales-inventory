const Purchase = require('../models/purchase.model');
const User = require('../models/user.model');




exports.createPurchase = async(req, res)=>{
    try {
        const { userId, productId, productName, sku, productCostPrice, productQuantity, productDescription, productImage, productCategory  } = req.body;
        // validate the user
        const user = await User.findOne({
            _id: userId
        });
        if (!user == "admin") {
            return res.status(400).send("You are not authorized to make a purchase");
        };
         const existProduct = await Purchase.findOne({ productName });
        if (existProduct){
            return res.status(400).send("Product already exist, kindly update it");
        };
        const purchase = await Purchase.create({
            userId, 
            productId, 
            productName, 
            sku, 
            productCostPrice, 
            productQuantity, 
            productDescription, 
            productImage, 
            productCategory
        });
        res.status(201).send(purchase);
    } catch (error) {
        res.status(500).send(error);
    }
};


// to update a purchase 
exports.updatePurchase = async(req, res)=>{
    try {

        const { userId, productId, productName, sku, productCostPrice, productQuantity, productDescription, productImage, productCategory  } = req.body;
        // validate the user
        const user =  await User.findOne();
        if (user.role === "admin") {
            return res.status(400).send("You are not authorized to make an update");
        };       
        const id = req.params.id;
        const purchase = await Purchase.findOneAndUpdate({
            productName: productName
        }, 
        {
            userId,
            productId,
            productName,
            sku,
            productCostPrice,
            $inc: { productQuantity : +productQuantity },
            productDescription,
            productImage,
            productCategory
        },
        {
            new: true
        });
        res.status(201).send(purchase);
    } catch (error) {
        res.status(500).send(error);
        
    }
};


// to delete a purchase 
exports.deletePurchase = async(req, res)=>{
    try {
        const {  userId, productId, productName, sku, productCostPrice, productQuantity, productDescription, productImage, productCategory } = req.body;
         // validate the user
        const user =  await User.findOne({
            _id: userId
        });
        if (!user == "admin") {
            return res.status(400).send("You are not authorized to make a delete");
        };
        const purchase = await Purchase.findOneAndDelete({
            
            productId,
            productName,
            sku,
            productCostPrice,
            productQuantity,
            productDescription,
            productImage,
            productCategory,
            // userId:_id

        });
        res.status(201).send({ purchase :"deleted successfully" });
    } catch (error) {
        res.status(500).send(error);
        console.log(error);
    }
};


// to get all purchases

exports.getAllPurchases= async (req, res)=>{
  try {
    const id = req.user._id;
    console.log(id);

    const users = await User.findOne({ userId: id })
    if(users.role === "admin" ){
      res.status(501).send('You are not authorized as Admin')
    };
    const existUsers = await Purchase.find();
    res.status(200).send(existUsers)  
  } catch (error) {
    
  }
};


// to get a purchase by id
exports.getPurchaseById = async(req , res)=>{
    try {
           // validate the user
        const user =  await User.findOne(
        );
        if (user.role === "admin") {
            return res.status(400).send("You are not authorized to view purchase");
        };
        const id  = req.params.id;
        const purchase = await Purchase.findOne({ _id: id })
        res.status(200).send(purchase);
    } catch (error) {
        res.status(500).send(error);
        console.log(error);
    }
};


// to get a purchase by user id
exports.getPurchaseByUserId = async(req , res)=>{
    try {
           // validate the user
        const user =  await User.findOne({
            _id: userId
        });
        if (user.role === "admin") {
            return res.status(400).send("You are not authorized to view purchase");
        };
        const { userId } = req.params.userId;
        const purchase = await Purchase.findOne (userId)
        res.status(200).send(purchase);
    } catch (error) {
        res.status(500).send(error);
    }
};

