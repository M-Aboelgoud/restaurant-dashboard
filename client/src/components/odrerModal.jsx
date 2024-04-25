import React from 'react';

const OrderModal = ({ isOpen, onClose, order }) => {
    if (!isOpen) {
        return null;
    }

    // Handle print action
    const handlePrint = () => {
        window.print();
    };

    // Handle overlay click for closing the modal
    const handleOverlayClick = (event) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75"
            onClick={handleOverlayClick}
        >
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Order Details</h2>
                    <button
                        onClick={handlePrint}
                        className="p-2 bg-blue-500 text-white rounded print:hidden"
                    >
                        Print
                    </button>
                </div>

                {/* Displaying order summary */}
                <div className="mb-4 border-b pb-4">
                    <p><strong>Order ID:</strong> {order.orderId}</p>
                    <p><strong>User ID:</strong> {order.orderBy}</p>
                    <p><strong>Delivery ID:</strong> {order.delivery}</p>
                    <p><strong>Order Status:</strong> {order.orderStatus}</p>
                    <p><strong>Order Time:</strong> {new Date(order.orderTime).toLocaleString()}</p>
                    <p><strong>Order Cost:</strong> ${order.orderCost.toFixed(2)}</p>
                    <p><strong>Address:</strong> {order.address}</p>
                    <p><strong>Order Lat/Long:</strong> {order.orderLatLng}</p>
                    <p><strong>Is Delivery:</strong> {order.isDelivery ? 'Yes' : 'No'}</p>
                </div>

                {/* Displaying order items */}
                <div className="mb-4 border-b pb-4">
                    <h3 className="font-bold mb-2">Items:</h3>
                    {Object.keys(order.items).map((itemId) => {
                        const item = order.items[itemId];
                        return (
                            <div key={itemId} className="mb-2">
                                <p><strong>Name:</strong> {item.name}</p>
                                <p><strong>Quantity:</strong> {item.quantity}</p>
                                <p><strong>Price:</strong> ${parseFloat(item.price).toFixed(2)}</p>
                                <p><strong>Cost:</strong> ${parseFloat(item.cost).toFixed(2)}</p>
                            </div>
                        );
                    })}
                </div>

                {/* Total cost of the order */}
                <div className="flex justify-end mt-4">
                    <p className="font-bold text-xl">Total Cost: ${order.orderCost.toFixed(2)}</p>
                </div>

                {/* Close button */}
                <button
                    onClick={onClose}
                    className="mt-6 p-2 bg-gray-500 text-white rounded print:hidden"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default OrderModal;
