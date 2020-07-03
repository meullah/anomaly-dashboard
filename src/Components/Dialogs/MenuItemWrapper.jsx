import React, { Component } from "react";
import { MenuItem } from "@material-ui/core";

class MenuItemWrapper extends Component {
  handleClick = () => {
    this.props.onItemClick(
      this.props.id,
      this.props.number,
      this.props.description,
      this.props.anomalyOn,
      this.props.type
    );
  };
  render() {
    const { id, children, ...others } = this.props;
    return (
      <MenuItem onClick={this.handleClick} key={id} {...others}>
        {children}
      </MenuItem>
    );
  }
}
export default MenuItemWrapper;
