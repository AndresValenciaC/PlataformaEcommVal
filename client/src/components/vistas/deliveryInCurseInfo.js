import React, { Component } from "react";
import "./clientEcom.css";
import { ListGroup } from "react-bootstrap";
import Header from "../HeaderDash";
import Axios from "axios";

export default class deliveryInCurseInfo extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      idPedido: this.props.location.idP,
      userInfo: [],
      productoInfo: [],
      idProducto: [],
      dropdownOpen: false
    };
  }
  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  componentDidMount() {
    // Send info to server
    const a = {
      idPed: this.state.idPedido
    };

    const url = "/itemInfoPedidoProducto";
    Axios.post(url, a)
      .then(res => {
        //
      })
      .catch(e => {
        //
      });

    // Shold be Axios.GET
    const urlB = "/itemInfoPedidoProducto";
    Axios.post(urlB, a)
      .then(res => {
        const productoInfo = res.data;
        console.log("Desde Axios PedidoInfo", productoInfo);
        this.setState({ productoInfo });
      })
      .catch(e => {
        //
      });

    const urlC = "/userInfoPedidoProducto";
    Axios.post(urlC, a)
      .then(res => {
        const userInfo = res.data;
        console.log("Desde Axios userInfo", userInfo);
        this.setState({ userInfo });
      })
      .catch(e => {
        //
      });
  }

  // Metodos del render
  totalQuantity = () =>
    this.state.prueba.reduce((sum, product) => sum + product.CantidadCompra, 0);
  totalPrice = () =>
    this.state.productoInfo.reduce(
      (sum, product) => sum + product.cantidadCompra * product.precioUnidad,
      0
    );

  render() {
    console.log("pedidoInfo", this.state.idPedido);

    return (
      <div class="container">
        <div class="row">
          <div class="col-xs-12">
            <div class="text-center">
              <Header
                title1="Pedidos En Proceso Información"
                opcion1="Home"
                rutaOpcion1="/homeAdmin"
                opcion2="Pedidos"
                rutaOpcion2="/deliveryInCurse"
              />
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
                  Pedido En Proceso Cliente :
                </strong>
              </h3>
              {this.state.userInfo.map(user => (
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
                    Productos En Proceso del Pedido
                  </strong>
                </h2>
              </div>
              <div className="panel-body">
                <div className="table-responsive">
                  <table class="table table-condensed">
                    <thead>
                      <tr>
                        <td className="text-center">
                          <strong>Id Pedido</strong>
                        </td>
                        <td className="text-center">
                          <strong>Id Producto App</strong>
                        </td>

                        <td className="text-center">
                          <strong>Producto</strong>
                        </td>
                        <td className="text-center">
                          <strong>CantidadStock</strong>
                        </td>
                        <td className="text-center">
                          <strong>CantidadCompra</strong>
                        </td>
                        <td className="text-center">
                          <strong>Precio</strong>
                        </td>

                        <td className="text-right">
                          <strong>Total * Unidad</strong>
                        </td>
                      </tr>
                    </thead>

                    {this.state.productoInfo.map(item => (
                      <tbody>
                        <tr>
                          <td className="text-left">{item.idPedido}</td>
                          <td className="text-left">
                            {item.idComercioProducto}
                          </td>

                          <td className="text-center">{item.nombreProducto}</td>
                          <td className="text-center">
                            {item.cantidadProducto}
                          </td>
                          <td className="text-center">{item.cantidadCompra}</td>
                          <td className="text-center">$ {item.precioUnidad}</td>

                          <td className="text-right">
                            {item.precioUnidad * item.cantidadCompra}
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

        <h2>
          <strong
            style={{
              fontSize: 30,
              fontFamily: "fantasy"
            }}
          >
            Total Pedido $ {this.totalPrice()}
          </strong>
        </h2>
      </div>
    );
  }
}
