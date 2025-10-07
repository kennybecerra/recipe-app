import React, { Component } from "react";
import classes from "./Modal.module.scss";

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }

  render() {
    return (
      <div
        className={classes.Container}
        onClick={this.props.toggleModal}
        style={this.props.show ? { zIndex: "10", opacity: "1" } : {}}
      >
        <div
          onClick={e => {
            e.stopPropagation();
            console.log("The modal was clicked");
          }}
          className={classes.Modal}
          style={this.props.show ? { transform: "translateY(0)" } : {}}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Modal;
