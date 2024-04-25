import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OrderModal from '../components/odrerModal';
import Header from "../partials/Header"; // Import the modal component

const OrderPage = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fetch orders from the API
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/orders');
                const data = response.data;

                // Ensure the data is an array
                if (Array.isArray(data)) {
                    setOrders(data);
                } else {
                    console.error('Unexpected data format:', data);
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    // Handle order click to open modal
    const handleOrderClick = (order) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    };

    // Handle closing the modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedOrder(null);
    };

    return (
        <>
        <div className="print:hidden"><Header /></div>
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Orders</h1>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg  print:hidden">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Order ID</th>
                            <th scope="col" className="px-6 py-3">User ID</th>
                            <th scope="col" className="px-6 py-3">Status</th>
                            <th scope="col" className="px-6 py-3"><span className="sr-only">View Details</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr
                                key={order.orderId}
                                className="bg-white border-b hover:bg-gray-100 cursor-pointer"
                                onClick={() => handleOrderClick(order)}
                            >
                                <td className="px-6 py-4">{order.orderId}</td>
                                <td className="px-6 py-4">{order.userId}</td>
                                <td className="px-6 py-4">{order.orderStatus}</td>
                                <td className="px-6 py-4 text-right">
                                    <button
                                        onClick={() => handleOrderClick(order)}
                                        className="font-medium text-blue-600 hover:underline"
                                    >
                                        View Details
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal for displaying order details */}
            {isModalOpen && (
                <OrderModal isOpen={isModalOpen} onClose={handleCloseModal} order={selectedOrder} />
            )}
        </div>
        </>
    );
};

export default OrderPage;
