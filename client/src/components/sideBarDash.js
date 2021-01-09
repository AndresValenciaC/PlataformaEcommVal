import React from "react";
import {
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button
} from "reactstrap";

import Axios from "axios";

export default class sideBarDash extends React.Component {
  // Metodo de Log out
  logOut = () => {
    const logOut = true;
    const url = "/logout";
    const salir = {
      salir: logOut
    };

    Axios.post(url, salir)
      .then(res => {
        //handle your login
      })
      .catch(e => {
        //handle your errors
      });

    if (logOut) {
      alert("Deseas Salir de Session");
    } else {
      alert("No Salio de Session");
    }
  };

  
  render() {
    return (
      <div style={{ Width:50, height: "100px" }}>
        <Nav vertical>
          <NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle caret size="lg">
                Dashboard Menu
              </DropdownToggle>
              <DropdownMenu left>
                <DropdownItem>
                  <NavLink href="/registerStore">
                    Registrar Comercio
                  </NavLink>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  <NavLink href="/storeInfo">Comercio Info</NavLink>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  <NavLink href="/userProfile">Usuario Info</NavLink>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  <NavLink href="/tableProd">Producto Info</NavLink>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  <NavLink href="/productShop">Compra Producto</NavLink>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  <NavLink href="/tableOfert">Oferta Producto</NavLink>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  <NavLink href="/deliveryInCurse">Pedidos en Linea</NavLink>
                </DropdownItem>

                <DropdownItem divider />
                <DropdownItem>
                  <NavLink href="/clientInfoInvoice">
                    Factura/Client Info
                  </NavLink>
                </DropdownItem>
                <DropdownItem divider />
              </DropdownMenu>
            </UncontrolledDropdown>
          </NavItem>
          <NavItem />
          <NavItem>
            <Button
              caret
              size="lg"
              onClick={this.logOut}
              href={"/"}
              color="secondary"
            >
              Salir{" "}
            </Button>
          </NavItem>
        </Nav>
      </div>
    );
  }
}
