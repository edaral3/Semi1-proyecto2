import React from "react";
import { Link } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink,
  Button
} from "shards-react";

var data = JSON.parse(localStorage.getItem('usuario')); 
export default class UserActions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };

    this.toggleUserActions = this.toggleUserActions.bind(this);
  }

  toggleUserActions() {
    this.setState({
      visible: !this.state.visible
    });
  }

  CerrarSesion(){
    localStorage.clear(); 
  }

  render() {
    return (
      <NavItem tag={Dropdown} caret toggle={this.toggleUserActions}>
        <DropdownToggle caret tag={NavLink} className="text-nowrap px-3">
          <img
            className="user-avatar rounded-circle mr-2"
            src={data.profileImage}
            alt="User Avatar"
          />{" "}
          <span className="d-none d-md-inline-block">{data.username}</span>
        </DropdownToggle>
        <Collapse tag={DropdownMenu} right small open={this.state.visible}>
          <DropdownItem divider />
          <DropdownItem tag={Link}to="/" className="text-danger">
            <Button  onClick={this.CerrarSesion}>
            <i onClick={this.CerrarSesion} className="material-icons text-danger" >&#xE879;</i> Cerrar Session
            </Button>
          </DropdownItem>
        </Collapse>
      </NavItem>
    );
  }
}
