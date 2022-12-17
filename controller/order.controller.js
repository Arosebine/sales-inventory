const Ordersales = require('../models/order.model');
const User = require('../models/user.model');
const Purchase = require('../models/purchase.model');




exports.createOrder = async(req, res)=>{
    try {
        const { userId, productId, productName, price, supplier, productQuantity } = req.body;
        // validate the user
        const user = await User.findOne();
        if (user.role == "admin") {
            return res.status(400).send("You are not authorized to make an order");
        }
       
        const order = await Ordersales.create({
            userId, 
            productId,
            productName,
            price, 
            supplier,
            productQuantity
        });
        res.status(201).send(order);
    } catch (error) {
        res.status(400).send(error);
        console.log(error);
    }
};

// update the order
exports.updateOrder = async(req, res)=>{
    try {
        const { userId, productId, productName, price, supplier, productQuantity } = req.body;
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
        const order = await Order.findOneAndUpdate({
            productName: productName
        },
        {
            userId, 
            productId,
            productName,
            price, 
            supplier,
            productQuantity
        },
        {
            new: true
        });
        res.status(200).send(order);
    } catch (error) {
        res.status(400).send(error);
    }
};

// delete an order
exports.deleteOrder = async(req, res)=>{
    try {
        const order = await Order.findOneAndDelete({
            productName: productName
        });
        res.status(200).send(order);
    } catch (error) {
        res.status(400).send
        (error);
    }
};

// delete by supplier
exports.deleteOrderBySupplier = async(req, res)=>{
    try {
        const order = await Order.findOneAndDelete({
            supplier: supplier
        });
        res.status(200).send(order);
    } catch (error) {
        res
        .status(400)
        .send
        (error);
    }
};

// delete by productId 
exports.deleteOrderByProductId = async(req, res)=>{
    try {
        const order = await Order
        .findOneAndDelete({

            productId: req.params.productId
        });
        res.status(200).send(order);
    } catch (error) {
        res
        .status(400)
        .send
        (error);
    }
};




// get all orders
exports.getAllOrders = async(req, res)=>{
    try {
        const order = await Order
        .find()
        .populate('userId', 'name')
        .populate('productId', 'productName')
        .populate('supplier', 'supplierName')
        .exec();
        res.status(200).send(order);
    } catch (error) {
        res.status
        (400
        ).
        send
        (error);
    }
};



// get an order by id
exports.getOrderById = async(req, res)=>{
    try {
        const order = await Order
        .findOne
        ({
            _id: req.params.id
        })
        .populate('userId', 'name')
        .populate('productId', 'productName')
        .populate('supplier', 'supplierName')
        .exec();
        res.status(200).send(order);
    } catch (error) {
        res.status(400).send(error);
    }
};

