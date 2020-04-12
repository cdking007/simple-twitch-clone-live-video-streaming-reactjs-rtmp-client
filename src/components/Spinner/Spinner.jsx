import React, { Component } from "react";
import "./Spinner.css";

class Spinner extends Component {
  render() {
    return (
      <div className="bg-spinner">
        <div className="lds-hourglass"></div>
      </div>
    );
  }
}

export default Spinner;
