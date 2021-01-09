import React from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

export default class sideBarDash extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand>
            <strong>{this.props.title1}</strong>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href={this.props.ruta}>
                  <strong>{this.props.title2}</strong>
                </NavLink>
              </NavItem>
              <NavItem />
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <NavLink href={this.props.rutaOpcion1}>
                      <strong>{this.props.opcion1}</strong>
                    </NavLink>
                  </DropdownItem>
                  <DropdownItem>
                    <NavLink href={this.props.rutaOpcion2}>
                      <strong>{this.props.opcion2}</strong>
                    </NavLink>
                  </DropdownItem>
                  <DropdownItem>
                    <NavLink href={this.props.rutaOpcion3}>
                      <strong>{this.props.opcion3}</strong>
                    </NavLink>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Reset</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
