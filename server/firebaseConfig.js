import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyCZYPUFTKfU5pAexS_HwDg5Nfg6YsWwOSs",
    authDomain: "smart-menu-ca2f4.firebaseapp.com",
    databaseURL: "https://smart-menu-ca2f4-default-rtdb.firebaseio.com",
    projectId: "smart-menu-ca2f4",
    storageBucket: "smart-menu-ca2f4.appspot.com",
    messagingSenderId: "24313547688",
    appId: "1:24313547688:web:99e90010569bf329c6eb9d",
    measurementId: "G-H6VWH6M065"
};
// Initialize Firebase app
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase database
const database = getDatabase(firebaseApp);

// Export the Firebase database instance and the config object
export { database, firebaseConfig };