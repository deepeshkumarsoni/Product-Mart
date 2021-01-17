const express = require("express");
const orderController = require("../controller/orderController");
const asyncHandler = require("express-async-handler");
const passport = require("passport");
const {submitOrder} = require('../controller/orderController');
const router = express.Router();

// http://localhost:4050/api/order/submit

router.post("/submit",asyncHandler(submitOrders));

async function submitOrders(req,res,next){
  const orderToSave = req.body;
  console.log("Received Order To Save",orderToSave);

  const order = await orderController.submitOrder(orderToSave);
  res.json(order);
}

// router.post(
//   "/submit",
//   passport.authenticate("jwt", { session: false }),
//   asyncHandler(submitOrder)
// );

// // http://localhost:4050/api/order/5ecd57e5c1aa49646c9f70aa
// router.get(
//   "/:orderId",
//   passport.authenticate("jwt", { session: false }),
//   asyncHandler(getOrderById)
// );

// // http://localhost:4050/api/order
// router.get(
//   "/",
//   passport.authenticate("jwt", { session: false }),
//   asyncHandler(getAllOrders)
// );

// // http://localhost:4050/api/order/userid/123
// router.get(
//   "/userid/:userId",
//   passport.authenticate("jwt", { session: false }),
//   asyncHandler(getOrdersByUserId)
// );

// async function submitOrder(req, res, next) {
//   const orderToSave = req.body;
//   console.log("Received order to save is", orderToSave);

//   const order = await orderController.submitOrder(orderToSave);

//   res.json(order);
// }

// async function getOrderById(req, res, next) {
//   const order = await orderController.getOrderById(req.params.orderId);
//   res.json(order);
// }

// async function getAllOrders(req, res, next) {
//   const orders = await orderController.getAllOrders();
//   res.json(orders);
// }

// async function getOrdersByUserId(req, res, next) {
//   const orders = await orderController.getOrdersByUserId(req.params.userId);
//   const mappedOrder = orders.map((order) => (order.orderId = order._id));
//   res.json(mappedOrder);
// }

module.exports = router;
