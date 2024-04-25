import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    orderId: {
        type: String,
        required: true
    },
    items: {
        type: Object,
        required: true
    },
    activeState: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    delivery: {
        type: String,
        required: true
    },
    isDelivery: {
        type: Boolean,
        required: true
    },
    orderBy: {
        type: String,
        required: true
    },
    orderCost: {
        type: Number,
        required: true
    },
    orderLatLng: {
        type: String,
        required: true
    },
    orderStatus: {
        type: String,
        required: true
    },
    orderTime: {
        type: Number,
        required: true
    },
    orderTo: {
        type: String,
        required: true
    },
    tableNumber: {
        type: String,
        required: true
    }
});

// Create a unique index on userId and orderId to prevent duplications
orderSchema.index({ userId: 1, orderId: 1 }, { unique: true });

const Order = mongoose.model('Order', orderSchema);

export default Order;