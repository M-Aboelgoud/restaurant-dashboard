import React, { useState } from "react";
import SliderContext from "./context";
import cx from "classnames";
import "./Item.css"; // Import your existing Item.css file

const AddItemButton = ({ onClick }) => {
    // State for tracking hover
    const [isHovered, setIsHovered] = useState(false);

    return (
        <SliderContext.Consumer>
            {({ elementRef }) => (
                <div
                    ref={elementRef}
                    className={cx(
                        "item",
                        "add-item-button flex flex-col justify-center items-center  bg-gray-800/60 hover:bg-gray-700 text-white cursor-pointer rounded-md",
                        { "h-40": true } // Adjust height to match the Item component's height
                    )}
                    onClick={onClick}
                    // Event handlers to manage hover state
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div className="p-4 text-center">
                        {/* Conditional rendering based on hover state */}
                        {isHovered ? (
                            <h5 className="text-sm font-semibold">Add item</h5>
                        ) : (
                            <span className="text-4xl">+</span> // Display plus icon when not hovered
                        )}
                    </div>
                </div>
            )}
        </SliderContext.Consumer>
    );
};

export default AddItemButton;
