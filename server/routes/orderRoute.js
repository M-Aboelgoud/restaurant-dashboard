import express from 'express';
import { getOrdersFromMongoDB } from '../controllers/orderController.js';

const router = express.Router();

// Define a route to retrieve orders from MongoDB
router.get('/', getOrdersFromMongoDB);

// Export the router
export default router;
