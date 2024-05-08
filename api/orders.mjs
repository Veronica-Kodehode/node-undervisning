import express from "express";
const router = express.Router();
import { ReqError } from "../middleware/errorHandler.mjs";
import jwtValidator from "../middleware/jwtValidator.mjs";
import {
  getOrders,
  getOrder,
  addOrder,
  deleteOrder,
} from "../database/dbQueries.mjs";

// GET all orders
router.get("/", jwtValidator, (req, res) => {
  const orders = getOrders();
  res.status(200).json({
    data: orders,
  });
});

// POST a new order
router.post("/", (req, res) => {
  const { customer_email, product } = req.body;
  if (!customer_email || !product) {
    next(new ReqError(400, "Missing required fields: customer_email, product"));
    return;
  }

  const newOrder = addOrder(customer_email, product);
  res.status(201).json({
    message: "Order added successfully",
    addedOrder: newOrder,
  });
});

// GET order details by orderId
router.get("/:orderId", (req, res, next) => {
  const { orderId } = req.params;
  const order = getOrder(orderId);
  if (order) {
    res.status(200).json({
      orderId: orderId,
      message: `Successfully fetched data for order ${orderId}`,
      data: order,
    });
  } else {
    next(
      new ReqError(404, `Cannot fetch: Order with id ${orderId} doesn't exist.`)
    );
  }
});

// DELETE an order by orderId
router.delete("/:orderId", (req, res, next) => {
  const { orderId } = req.params;
  const order = getOrder(orderId);
  if (order) {
    deleteOrder(orderId);
    res.status(200).json({
      orderId: orderId,
      message: `Successfully deleted order with id ${orderId}`,
    });
  } else {
    next(
      new ReqError(
        404,
        `Cannot delete: Order with id ${orderId} doesn't exist.`
      )
    );
  }
});

export default router;
