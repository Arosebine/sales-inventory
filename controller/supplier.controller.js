const Supplier = require('../models/supplier.model');
const User = require('../models/user.model');




exports.createSupplier = async(req, res)=>{
    try {
        const { supplierName, supplierEmail, supplierPhone, supplierAddress, supplierDescription } = req.body;
        // validate the user
        const user = await User.findOne();
        if (user.role == "admin") {
            return res.status(400).send("You are not authorized to make a supplier");
        }
        // check if the supplier already exist
        const existSupplier = await Supplier.findOne({ supplierName: supplierName });
        if (existSupplier){
            return res.status(400).send("Supplier already exist, kindly update it");
        }
        const supplier = await Supplier.create({
            supplierName,
            supplierEmail,
            supplierPhone,
            supplierAddress,
            supplierDescription
        });
        res.status(201).send(supplier);
    } catch (error) {
        res.status(400).send(error);
        console.log(error);

    }
};


// to update a supplier
exports.updateSupplier = async(req, res)=>{
    try {

        const { userId, supplierName, supplierEmail, supplierPhone, supplierAddress, supplierDescription } = req.body;
        // validate the user
        const user = await User.findOne();
        if (user.role === "admin") {
            return res.status(400).send("You are not authorized to make an update");
        }
        const supplier = await Supplier.findOneAndUpdate({
            supplierName: supplierName
        },
        {
            userId,
            supplierName,
            supplierEmail,
            supplierPhone,
            supplierAddress,
            supplierDescription
        },
        {
            new: true,
        }
        );
        res.status(200).send(supplier);
    } catch (error) {
        res.status(400).send(error);
        console.log(error);
    }
};


// to delete a supplier
exports.deleteSupplier = async(req, res)=>{
    try {
        const { supplierName,
            supplierEmail,
            supplierPhone,
            supplierAddress,
            supplierDescription } = req.body;
        // validate the user
        const deletedSupplier = await Supplier.findOne({ supplierName: supplierName });
        if (!deletedSupplier){
            return res.status(400).send("Supplier does not exist");
        };
        const supplier = await Supplier.findOneAndDelete({
        supplierName: supplierName
        },
        {
            supplierName,
            supplierEmail,
            supplierPhone,
            supplierAddress,
            supplierDescription
        });
        res.status(200).send({supplier: supplier, 'Deleted successfully': true});
    } catch (error) {
        res
        .status(400)
        .send
        (error);
        console.log(error);
    
        
    }
};



// to get all suppliers
exports.getAllSuppliers = async(req, res)=>{
    try {
        const supplier = await Supplier.find();
        res.status(200).send(supplier);
    } catch (error) {
        res.status(400).send(error
            );
        console.log(error);
    }
};


// to get a supplier
exports.getSupplier = async(req, res)=>{
    try {
        const id = req.params.id;
        const supplier = await Supplier.findOne
        ({
            _id: id
        });
        res.status(200).send(supplier);
    } catch (error) {
        res.status(400).send(error);
        console.log(error);
    }
};



// to get a supplier by name
exports.getSupplierByName = async(req, res)=>{
    try {
        const supplierName = req.params.supplierName;
        // validate if supplier exist
        const existSupplier = await Supplier.findOne({ supplierName: supplierName });
        if (!existSupplier){
            return res.status(400).send("Supplier does not exist");
        }
        const supplier = await Supplier.findOne({
            supplierName: supplierName
        });
        res.status(200).send(supplier);

    } catch (error) {
        res.status(400).send(error);
        console.log(error);
    }
};


// to get a supplier by email
exports.getSupplierByEmail = async(req, res)=>{
    try {
        const email = req.params.email;
        const supplier = await Supplier
        .findOne({
            supplierEmail: email
        });
        res.status(200).send(supplier);
    } catch (error) {
        res.status(400).send(error);
        console.log(error);
    }
};


