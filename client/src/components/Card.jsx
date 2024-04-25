import React, { Component } from "react";

class Card extends Component {
  render() {
    const { item } = this.props;
    return (
      <div className="bg-netflix-gray-2 rounded-md">
        <div className="relative">
          <img className="rounded-t-md" src={item?.image}></img>
        </div>
      </div>
    );
  }
}

export default Card;
