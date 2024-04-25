import React, { Component } from "react";
import CrossIcon from "../Icons/CrossIcon";
import "../../css/style.css";
// import DashboardCard06 from "../../partials/dashboard/DashboardCard06";
// import DashboardCard11 from "../../partials/dashboard/DashboardCard11";
import FlipCard from "../FipCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      muted: false,
      flipCards: [1, 2, 3], // Initial flip cards
    };
  }




  render() {
    const { book, onClose } = this.props;
    const { flipCards } = this.state;

    // Slider settings
    const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
    };

    return (
      <div className="fixed flex justify-center top-0 left-0 w-full h-full bg-black bg-opacity-80 z-[1000] overflow-y-auto">
        <div className="absolute bg-netflix-black-2 z-[1000] w-[98%] lg:w-7/12 rounded-md top-5">
          <div className="h-full w-full relative">
            <button
              onClick={onClose}
              className="flex absolute top-4 right-4 justify-center items-center  bg-netflix-black-2  w-9 h-9 rounded-full z-20"
            >
              <CrossIcon width={18} height={18} color="white" />
            </button>
          </div>

          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table
                className={`w-full text-sm text-left ${book.language === "Arabic" ? "rtl" : "ltr"
                  } text-gray-500 dark:text-gray-400`}
              >
                <thead
                  className={`text-xs text-gray-700 uppercase ${book.language === "Arabic" ? "rtl" : "ltr"
                    } bg-gray-50 dark:bg-gray-700 dark:text-gray-400`}
                >
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      {book.menu[0].category} / Category
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Price / السعر
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Map through items and render each as a row */}
                  {book.menu[0].items.map((menuItem) => (
                    <tr
                      key={menuItem._id.$oid}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {menuItem.name}
                      </th>
                      <td className="px-6 py-4">
                        {menuItem.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Content;
