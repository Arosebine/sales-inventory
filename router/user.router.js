const express = require('express');
const { createOrder, updateOrder, deleteOrder, deleteOrderByProductId, deleteOrderBySupplier, getAllOrders, getOrderById } = require('../controller/order.controller');
const { createPurchase, updatePurchase, deletePurchase, getPurchaseById, getPurchaseByUserId, getAllPurchases } = require('../controller/purchase.controller');
const { createSales, deleteSales, getAllSales, getSalesById, getSalesByUserId, getSalesByProductId, getSalesByProductQuantity, getSalesByDate } = require('../controller/sales.controller');
const { updateSupplier, createSupplier, getAllSuppliers, deleteSupplier, getSupplierByName } = require('../controller/supplier.controller');
const { createUser, userLogin, viewUsers, updateUser, deleteUser, switchAdmin } = require('../controller/user.controller');
const router = express.Router();
const { isAuth } = require('../middleware/auth');





// users

router.post('/create', createUser);
router.post('/login',  userLogin);
router.get('/view', isAuth, viewUsers );
router.put('/update/:email', isAuth, updateUser);
router.delete('/delete/:id', isAuth, deleteUser);
router.put('/admin/:id', isAuth, switchAdmin );



// purchase
router.post('/purchase', createPurchase);
router.put('/productName', isAuth, updatePurchase);
router.delete('/deleted', deletePurchase);
router.get('/purchasese/:id', isAuth, getPurchaseById);
// router.get('/purchase/:userId', isAuth, getPurchaseByUserId);
router.get('/viewpurchase', isAuth, getAllPurchases );


// sales
router.post('/sales', createSales );
// router.put('/update/productName', updateSales );
router.delete('/deletesales', deleteSales );
router.get('/viewsales', isAuth, getAllSales );
// router.get('/sales/:productQuantity', isAuth, getSalesByProductQuantity );
// router.get('/sales/:date', isAuth, getSalesByDate );



// order form
router.post('/order', createOrder );
router.put('/update/', updateOrder );
router.delete('/delete/', deleteOrder );
router.delete('/delete/:productId', deleteOrderByProductId );
router.delete('/delete/:supplier', deleteOrderBySupplier );
router.get('/order', isAuth, getAllOrders );
router.get('/order/:id', isAuth, getOrderById );



// supplier
router.post('/supply', createSupplier);
router.put('/updatesupply', isAuth, updateSupplier);
router.get('/viewsupply', isAuth, getAllSuppliers );
router.delete('/deletesupply',  isAuth, deleteSupplier);
router.get('/getsupply/:supplierName', isAuth, getSupplierByName );


















module.exports = router;
