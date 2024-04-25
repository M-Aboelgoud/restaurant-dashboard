import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema({
    name: {
        type: String,

    },
    price: {
        type: String,
    }
});

const menuCategorySchema = new mongoose.Schema({
    category: {
        type: String,

    },
    items: [menuItemSchema] // Array of menu items
});

const menuSchema = new mongoose.Schema({
    name: {
        type: String,

    },
    m_user: {
        type: String,
        // required: true,
    },
    image: {
        type: String,

    },
    menu: [menuCategorySchema]
    
});

const Menu = mongoose.model("menu", menuSchema);

export default Menu;
