import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

class MenuNav extends Component {
  render() {
    return (
      <div>
        {
          this.props.currentUser.isLogged
          ? <Menu>
              <Menu.Item
                name="logout"
                // active={activeItem === "login"}
                onClick={this.props.logoutHandler}
                >
                  Logout
                </Menu.Item>
            </Menu>
          :
          <Menu>
            <Link to="/login">
              <Menu.Item
                name="login"
                // active={activeItem === "login"}
                onClick={this.props.logIn}
                >
                  Login
              </Menu.Item>
            </Link>
            <Link to="/signup">
              <Menu.Item 
                name="signUp"
                // active={activeItem === "signUp"}
                onClick={this.props.signUp}
                >
                  Sign Up
              </Menu.Item>
            </Link>
          </Menu>
        }
      </div>
    )
  }
}

export default MenuNav