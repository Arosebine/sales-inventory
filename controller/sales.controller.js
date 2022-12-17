const Sales = require('../models/sales.model');
const User = require('../models/user.model');
const Purchase = require('../models/purchase.model');


exports.createSales = async(req, res)=>{
    try {
        const { userId, productId, price, productName, productQuantity } = req.body;
        // validate the user
        const user = await User.findOne();
        if (user.role === "admin") {
            return res.status(400).send("You are not authorized to make a sales");
        };        
        const sales = await Sales.create({
            userId, 
            productId,
            productName,
            price, 
            productQuantity
        });
        // update the sales
         const updatePurchase = await Purchase.findOneAndUpdate({
            productName: sales.productName
        },
        {
            $inc: { productQuantity: -productQuantity } 
        },
        {
            new: true
        });
        res.status(201).send({sales, updatePurchase});
    } catch (error) {
        res.status(400).send(error);
        console.log(error);
    }
};



// to update a purchase
exports.updateSales = async(req, res)=>{
    try {
        const { productName, price, productId, productQuantity } = req.body;
        // validate the user
        const user =  await User.findOne();
        if (user.role === "admin") {
            return res.status(400).send("You are not authorized to make an update");
        }
        const purchase = await Purchase.findOne({
            productName: productName
        });
        if (purchase) {
            return res.status(400).send("Product not found");
        }
        const sales = await Sales.findOneAndUpdate({
            productName: productName
        },
        {
            productName,
            price,
            productId,
            productQuantity
        },
        {
            new: true
        });
        // update the sales
        const updatePurchase = await Purchase.findOneAndUpdate({
            _id: productId
        },
        {
            $inc: { productQuantity: -productQuantity }
        },
        {
            new: true
        });
        res.status(201).send(sales);
    } catch (error) {
        res.status(400).send(error);
    }
};


// to delete a purchase
exports.deleteSales = async(req, res)=>{
    try {
        const { productName, price, productId, productQuantity } = req.body;
        // validate the user
        const user =  await User.findOne();
        if (user.role === "admin") {
            return res.status(400).send("You are not authorized to delete");
        }
        // const purchase = await Purchase.findOne({
        //     productName: productName
        // });
        // if (purchase) {
        //     return res.status(400).send("Product not found");
        // }
        const sales = await Sales.findOneAndDelete({
            productName: productName
        },
        {
            productId,
            productName,
            price,
            productQuantity
        });
        // update the sales
        const updatePurchase = await Purchase.findOneAndUpdate({
            productName: productName
        },
        {
            $inc: { productQuantity: +productQuantity }
        },
        {
            new: true
        });
        res.status(201).send({success: "sales deleted successfully",  updatePurchase});

    } catch (error) {
        res.status(400).send(error);
        console.log(error);
    }
};



// to get all sales
exports.getAllSales = async(req, res)=>{
    try {
        const sales = await Sales.find();
        res.status(200).send(sales);
    } catch (error) {
        res.status(400).send(error
        );
    }
};


// to get a sales by product quantity
exports.getSalesByProductQuantity = async(req, res)=>{
    try {
        const { id } = req.params;
        const sales = await Sales.findOne({
            productQuantity: id
        });
        res.status(200).send(sales);
    } catch (error) {
        res.status(400).send
        (error);
    }
};


// to get a sales by date
exports.getSalesByDate = async(req, res)=>{
    try {
        const { id } = req.params;
        const sales = await Sales.findOne({
            createdAt: id
        });
        res.status(200).send(sales);
    } catch (error) {
        res.status(400).send(error
        );
    }
};


