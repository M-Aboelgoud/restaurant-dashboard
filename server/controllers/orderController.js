import Order from '../models/order.js';
import { ref, onChildAdded, onChildChanged, onChildRemoved } from 'firebase/database';
import { database } from '../firebaseConfig.js';
// Import your Firebase database instance

// Function to listen for changes in Firebase and update MongoDB
const listenAndUpdateData = () => {
    // Reference to the 'Users' path in Firebase
    const usersRef = ref(database, 'Users');

    // Function to handle order updates in MongoDB
    const updateOrderInMongo = async (userId, orderId, orderData) => {
        try {
            const existingOrder = await Order.findOne({ userId, orderId });

            if (existingOrder) {
                // Update existing order
                existingOrder.items = orderData.Items;
                existingOrder.activeState = orderData.activeState;
                existingOrder.address = orderData.address;
                existingOrder.delivery = orderData.delivery;
                existingOrder.isDelivery = orderData.isDelivery === 'true';
                existingOrder.orderBy = orderData.orderBy;
                existingOrder.orderCost = parseFloat(orderData.orderCost);
                existingOrder.orderLatLng = orderData.orderLatLng;
                existingOrder.orderStatus = orderData.orderStatus;
                existingOrder.orderTime = parseInt(orderData.orderTime);
                existingOrder.orderTo = orderData.orderTo;
                existingOrder.tableNumber = orderData.tableNumber;

                await existingOrder.save();
                console.log(`Order ${orderId} updated in MongoDB for user ${userId}`);
            } else {
                // Create new order
                const order = new Order({
                    userId,
                    orderId,
                    items: orderData.Items,
                    activeState: orderData.activeState,
                    address: orderData.address,
                    delivery: orderData.delivery,
                    isDelivery: orderData.isDelivery === 'true',
                    orderBy: orderData.orderBy,
                    orderCost: parseFloat(orderData.orderCost),
                    orderLatLng: orderData.orderLatLng,
                    orderStatus: orderData.orderStatus,
                    orderTime: parseInt(orderData.orderTime),
                    orderTo: orderData.orderTo,
                    tableNumber: orderData.tableNumber,
                });

                await order.save();
                console.log(`New order ${orderId} saved to MongoDB for user ${userId}`);
            }
        } catch (error) {
            console.error(`Error updating order ${orderId} for user ${userId}:`, error);
        }
    };

    // Handle new orders
    onChildAdded(usersRef, async (snapshot) => {
        const userId = snapshot.key;
        const userData = snapshot.val();

        if (userData && userData.Orders) {
            for (const orderId in userData.Orders) {
                const orderData = userData.Orders[orderId];
                if (!userId || !orderId) {
                    console.error('Invalid userId or orderId:', userId, orderId);
                    continue;
                }
                await updateOrderInMongo(userId, orderId, orderData);
            }
        }
    });

    // Handle updated orders
    onChildChanged(usersRef, async (snapshot) => {
        const userId = snapshot.key;
        const userData = snapshot.val();

        if (userData && userData.Orders) {
            for (const orderId in userData.Orders) {
                const orderData = userData.Orders[orderId];
                if (!userId || !orderId) {
                    console.error('Invalid userId or orderId:', userId, orderId);
                    continue;
                }
                await updateOrderInMongo(userId, orderId, orderData);
            }
        }
    });

    // Handle removed orders
    onChildRemoved(usersRef, async (snapshot) => {
        const userId = snapshot.key;
        const userData = snapshot.val();

        if (userData && userData.Orders) {
            for (const orderId in userData.Orders) {
                if (!userId || !orderId) {
                    console.error('Invalid userId or orderId:', userId, orderId);
                    continue;
                }

                await Order.deleteOne({ userId, orderId });
                console.log(`Order ${orderId} removed from MongoDB for user ${userId}`);
            }
        }
    });
};

// Start listening for changes



const fetchAndSaveOldData = async () => {
    try {
        // Get a reference to the 'Users' path in the Firebase Realtime Database
        const usersRef = ref(database, 'Users');

        // Retrieve all user data from Firebase
        const usersSnapshot = await get(usersRef);

        if (usersSnapshot.exists()) {
            const usersData = usersSnapshot.val();

            // Iterate through each user
            for (const userId in usersData) {
                const userData = usersData[userId];

                // Get a reference to the 'Orders' path under each user
                const ordersRef = ref(database, `Users/${userId}/Orders`);

                // Retrieve all order data for the user
                const ordersSnapshot = await get(ordersRef);

                if (ordersSnapshot.exists()) {
                    const ordersData = ordersSnapshot.val();

                    // Iterate through each order and save it to MongoDB
                    for (const orderId in ordersData) {
                        const orderData = ordersData[orderId];

                        // Create a new Order instance
                        const order = new Order({
                            userId,
                            orderId,
                            items: orderData.Items,
                            activeState: orderData.activeState,
                            address: orderData.address,
                            delivery: orderData.delivery,
                            isDelivery: orderData.isDelivery === 'true',
                            orderBy: orderData.orderBy,
                            orderCost: parseFloat(orderData.orderCost),
                            orderLatLng: orderData.orderLatLng,
                            orderStatus: orderData.orderStatus,
                            orderTime: parseInt(orderData.orderTime),
                            orderTo: orderData.orderTo,
                            tableNumber: orderData.tableNumber,
                        });

                        // Save the order to MongoDB
                        await order.save();
                        console.log(`Order ${orderId} saved to MongoDB for user ${userId}`);
                    }
                }
            }
        }
    } catch (error) {
        console.error('Error fetching and saving old data from Firebase:', error);
    }
};

// const fetchAndSaveOldData = async () => {

//     try {
//         // Get a reference to the 'Users' path in the Firebase Realtime Database
//         const usersRef = ref(database, 'Users');

//         // Retrieve all user data from Firebase
//         const usersSnapshot = await get(usersRef);

//         if (usersSnapshot.exists()) {
//             const usersData = usersSnapshot.val();

//             // Iterate through each user
//             for (const userId in usersData) {
//                 const userData = usersData[userId];

//                 // Get a reference to the 'Orders' path under each user
//                 const ordersRef = ref(database, `Users/${userId}/Orders`);

//                 // Retrieve all order data for the user
//                 const ordersSnapshot = await get(ordersRef);

//                 if (ordersSnapshot.exists()) {
//                     const ordersData = ordersSnapshot.val();

//                     // Iterate through each order and save it to MongoDB
//                     for (const orderId in ordersData) {
//                         const orderData = ordersData[orderId];

//                         // Create a new Order instance
//                         const order = new Order({
//                             userId,
//                             orderId,
//                             items: orderData.Items,
//                             activeState: orderData.activeState,
//                             address: orderData.address,
//                             delivery: orderData.delivery,
//                             isDelivery: orderData.isDelivery === 'true',
//                             orderBy: orderData.orderBy,
//                             orderCost: parseFloat(orderData.orderCost),
//                             orderLatLng: orderData.orderLatLng,
//                             orderStatus: orderData.orderStatus,
//                             orderTime: parseInt(orderData.orderTime),
//                             orderTo: orderData.orderTo,
//                             tableNumber: orderData.tableNumber,
//                         });

//                         // Save the order to MongoDB
//                         await order.save();
//                         console.log(`Order ${orderId} saved to MongoDB for user ${userId}`);
//                     }
//                 }
//             }
//         }
//     } catch (error) {
//         console.error('Error fetching and saving old data from Firebase:', error);
//     }
// };

// Function to retrieve orders from MongoDB
export const getOrdersFromMongoDB = async (req, res) => {
    await listenAndUpdateData();
    try {
        // Retrieve all orders from MongoDB
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        console.error('Error retrieving orders:', error);
        res.status(500).json({ error: 'Failed to retrieve orders' });
    }
  
};
