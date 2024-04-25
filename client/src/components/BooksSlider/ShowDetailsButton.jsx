import React, { Component } from "react";
import "./ShowDetailsButton.css";

import DownArrowIcon from "../Icons/DownArrowIcon";

import "../../css/style.css";

function renderContents(data) {
  return data.map((element, index) => {
    if (index == 0) {
      return <span>{element}</span>;
    } else {
      return (
        <>
          <div className="w-1 h-1 flex justify-center items-center text-center  rounded-full bg-netflix-gray mx-1"></div>
          <span>{element}</span>
        </>
      );
    }
  });
}

class ShowDetailsButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myData: null,
    };
  }

  render() {
    const { book } = this.props;
    return (
      <div className="show-details-button shadow-lg">
        <div className="flex flex-col text-left w-full h-full rounded-b-lg  bg-netflix-black-2 py-2">
          <div className="flex flex-row text-xs p-2 px-4 justify-between">
            {" "}
            <h1 className="font-bold text-slate-100 dark:text-slate-100">
              {book?.name}
            </h1>
            
            <button
              onClick={this.props.onClick}
              className="flex justify-center items-center  border-netflix-gray  w-8 h-8 border-2 rounded-full hover:border-white"
            >
              <DownArrowIcon width={15} height={15} color="white" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ShowDetailsButton;
