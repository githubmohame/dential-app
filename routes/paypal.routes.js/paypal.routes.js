import { createOrder, capturePayment } from "../../paypal.js";
import express from "express";

const router = express.Router();

// Route to create PayPal order
router.post("/create-order", async (req, res) => {
  const { items, cost } = req.body; // Assuming `items` and `cost` are passed from the frontend

  try {
    const approvalUrl = await createOrder(items, cost);
    res.json({ approvalUrl });
  } catch (error) {
    res.status(500).json({ error: "Failed to create PayPal order" });
  }
});

// Route to capture payment
router.post("/capture-payment/:orderId", async (req, res) => {
  const { orderId } = req.params;

  try {
    const captureData = await capturePayment(orderId);
    res.json({ captureData });
  } catch (error) {
    res.status(500).json({ error: "Failed to capture PayPal payment" });
  }
});

export default router;
