import React, { Component } from "react";
import "./clientEcom.css";
import { ListGroup } from "react-bootstrap";
import Header from "../header";

export default class clientEcom extends Component {
  constructor() {
    super();
    this.state = {
      facturaStore: [],
      clienteComercioInfo: []
    };
  }

  // From Api 3 & 4
  componentDidMount() {

    /** 
    fetch("/facturaInfo")
      .then(res => res.json())
      .then(facturaStore =>
        this.setState({ facturaStore }, () =>
          console.log("facturaStore fetched...", facturaStore)
        )
      );

    fetch("/clienteComercioInfo")
      .then(res => res.json())
      .then(clienteComercioInfo =>
        this.setState({ clienteComercioInfo }, () =>
          console.log("clienteComercioInfo fetched...", clienteComercioInfo)
        )
      );
*/
  }

  render() {
    return (
      <div class="container">
        <div class="row">
          <div class="col-xs-12">
            <div class="text-center">
              <Header title="Client-Commerce Info Invoice" />
            </div>
            <hr />

            <div>
              <h3>
                <strong
                  style={{
                    fontSize: 40,
                    fontFamily: "fantasy"
                  }}
                >
                  Informacion de los clientes :
                </strong>
              </h3>
              {this.state.clienteComercioInfo.map(user => (
                <ListGroup>
                  <ListGroup.Item>
                    {user.idUsuario} -- {user.nombreUsuario}
                    {user.apellidoUsuario} -- {user.telefonoUsuario} --
                    {user.correoUsuario} -- {user.direccionUsuario}
                  </ListGroup.Item>
                </ListGroup>
              ))}
            </div>
          </div>
        </div>
        <br />
        <br />
        <div className="row">
          <div className="col-md-12">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h2 className="text-center">
                  <strong
                    style={{
                      fontSize: 40,
                      fontFamily: "fantasy"
                    }}
                  >
                    Invoice Commercio Summario
                  </strong>
                </h2>
              </div>
              <div className="panel-body">
                <div className="table-responsive">
                  <table class="table table-condensed">
                    <thead>
                      <tr>
                        <td className="text-center">
                          <strong>Id Invoice</strong>
                        </td>
                        <td className="text-center">
                          <strong>Invoice Fecha</strong>
                        </td>
                        <td className="text-center">
                          <strong>Nombre Cliente</strong>
                        </td>
                        <td className="text-center">
                          <strong>Nombre Item</strong>
                        </td>
                        <td className="text-center">
                          <strong>Precio Item</strong>
                        </td>
                        <td className="text-center">
                          <strong>Cantidad Item</strong>
                        </td>
                        <td className="text-right">
                          <strong>Total</strong>
                        </td>
                      </tr>
                    </thead>

                    {this.state.facturaStore.map(user => (
                      <tbody>
                        <tr>
                          <td className="text-left">{user.idPedidoFactura}</td>
                          <td className="text-center">{user.fecha}</td>
                          <td className="text-center">
                            {user.nombreUsuario} {user.apellidoUsuario}{" "}
                          </td>
                          <td className="text-center">{user.nombreProducto}</td>
                          <td className="text-center">
                            $ {user.precioUnidadProducto}
                          </td>
                          <td className="text-center">
                            {user.cantidadProducto}
                          </td>
                          <td className="text-right">
                            {" "}
                            ${" "}
                            {user.precioUnidadProducto * user.cantidadProducto}
                          </td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
