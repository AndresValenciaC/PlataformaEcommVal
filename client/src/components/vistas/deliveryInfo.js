import React, { Component } from "react";
import "./clientEcom.css";
import { ListGroup } from "react-bootstrap";
import Header from "../header";
import { Text, View } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

/**
 * Array from Mobil App
 * Array [
  Object {
    "Cantidad": 1,
    "item": Object {
      "cantidadProducto": "15",
      "descripcionProducto": "Las mejores empanadas con el mejor aji",
      "detalleComercio": "Restaurante de comida tradicional vallecaucana",
      "idComercio": "1",
      "idComercioProducto": "1",
      "idProducto": "2",
      "imagenComercio": "http://mydigitall.com/TesisAndres/imagenesProyecto/imagenComercio/antinos.jpg",
      "imagenProducto": "https://www.divinacocina.es/wp-content/uploads/empanadillas-de-pollo-al-curry.jpg",
      "nombreProducto": "Empanadas",
      "nombreTienda": "Antinos",
      "precioUnidadProducto": "3000",
    },
  },
  Object {
    "Cantidad": 2,
    "item": Object {
      "cantidadProducto": "50",
      "descripcionProducto": "Refrescante variedad de jugos preparados con leche ",
      "detalleComercio": "Restaurante de comida tradicional vallecaucana",
      "idComercio": "1",
      "idComercioProducto": "38",
      "idProducto": "26",
      "imagenComercio": "http://mydigitall.com/TesisAndres/imagenesProyecto/imagenComercio/antinos.jpg",
      "imagenProducto": "https://image.shutterstock.com/image-photo/isolated-drinks-glasses-fresh-citrus-260nw-120518788.jpg",
      "nombreProducto": "Jugo",
      "nombreTienda": "Antinos",
      "precioUnidadProducto": "3000",
    },
  },
  Object {
    "Cantidad": 2,
    "item": Object {
      "cantidadProducto": "6",
      "descripcionProducto": "Diferente tipos de minios acolchonados de algodon y de diferentes colores",
      "detalleComercio": "Multinacional de tiendas de juguetes",
      "idComercio": "5",
      "idComercioProducto": "16",
      "idProducto": "16",
      "imagenComercio": "http://mydigitall.com/TesisAndres/imagenesProyecto/imagenComercio/toysRus.jpg",
      "imagenProducto": "https://www.importempireaf.com/img/p/6/6/4/0/6640.jpg",
      "nombreProducto": "Munecos de Peluche",
      "nombreTienda": "Toys_R_US",
      "precioUnidadProducto": "60000",
    },
  },
]
 * 
 */

const ProductPedido = [
  {
    fechaPedido: "01/06/2018",
    CantidadCompra: 1,
    cantidadProducto: "15",
    descripcionProducto: "Las mejores empanadas con el mejor aji",
    detalleComercio: "Restaurante de comida tradicional vallecaucana",
    idComercio: "1",
    idComercioProducto: "1",
    idProducto: "2",
    imagenComercio:
      "http://mydigitall.com/TesisAndres/imagenesProyecto/imagenComercio/antinos.jpg",
    imagenProducto:
      "https://www.divinacocina.es/wp-content/uploads/empanadillas-de-pollo-al-curry.jpg",
    nombreProducto: "Empanadas",
    nombreTienda: "Antinos",
    precioUnidadProducto: "3000"
  },

  {
    CantidadCompra: 2,
    cantidadProducto: "50",
    descripcionProducto: "Refrescante variedad de jugos preparados con leche ",
    detalleComercio: "Restaurante de comida tradicional vallecaucana",
    idComercio: "1",
    idComercioProducto: "38",
    idProducto: "26",
    imagenComercio:
      "http://mydigitall.com/TesisAndres/imagenesProyecto/imagenComercio/antinos.jpg",
    imagenProducto:
      "https://image.shutterstock.com/image-photo/isolated-drinks-glasses-fresh-citrus-260nw-120518788.jpg",
    nombreProducto: "Jugo",
    nombreTienda: "Antinos",
    precioUnidadProducto: "3000"
  },
  {
    CantidadCompra: 2,
    cantidadProducto: "6",
    descripcionProducto:
      "Diferente tipos de minios acolchonados de algodon y de diferentes colores",
    detalleComercio: "Multinacional de tiendas de juguetes",
    idComercio: "5",
    idComercioProducto: "16",
    idProducto: "16",
    imagenComercio:
      "http://mydigitall.com/TesisAndres/imagenesProyecto/imagenComercio/toysRus.jpg",
    imagenProducto: "https://www.importempireaf.com/img/p/6/6/4/0/6640.jpg",
    nombreProducto: "Munecos de Peluche",
    nombreTienda: "Toys_R_US",
    precioUnidadProducto: "60000"
  }
];

const user = [
  {
    idUsuario: 1,
    nombreUsuario: "andres",
    apellidoUsuario: "Valencia",
    direccionUsuario: "calle 4",
    telefonoUsuario: "256677377",
    correoUsuario: "andres@gmail.com"
  }
];

export default class deliveryInfo extends Component {
  constructor() {
    super();
    this.toggle = this.toggle.bind(this);
    this.state = {
      facturaStore: [],
      clienteComercioInfo: [],
      dropdownOpen: false,
      prueba: [],
      usuario: []
    };
  }
  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  opcion() {
    alert("Se realizo click");
  }

  // From Api 3 & 4
  componentDidMount() {
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
    this.setState({
      prueba: ProductPedido
    });

    this.setState({
      usuario: user
    });
  }

  // Metodos del render
  totalQuantity = () =>
    this.state.prueba.reduce((sum, product) => sum + product.CantidadCompra, 0);
  totalPrice = () =>
    this.state.prueba.reduce(
      (sum, product) =>
        sum + product.CantidadCompra * product.precioUnidadProducto,
      0
    );

  render() {
    console.log("---DesdeDelivery-Prueba---", this.totalQuantity());
    console.log("---DesdeDelivery-Prueba---");
    return (
      <div class="container">
        <div class="row">
          <div class="col-xs-12">
            <div class="text-center">
              <Header title="Pedidos En Linea" />
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
                  Cliente En Proceso de Pedido :
                </strong>
              </h3>
              {this.state.usuario.map(user => (
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
                    Productos En Proceso de Pedido del cliente
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
                          <strong>Pedido Fecha</strong>
                        </td>

                        <td className="text-center">
                          <strong>Producto</strong>
                        </td>
                        <td className="text-center">
                          <strong>Precio</strong>
                        </td>
                        <td className="text-center">
                          <strong>CantidadCompra</strong>
                        </td>
                        <td className="text-right">
                          <strong>Total * Unidad</strong>
                        </td>
                      </tr>
                    </thead>

                    {this.state.prueba.map(user => (
                      <tbody>
                        <tr>
                          <td className="text-left">{user.id}</td>
                          <td className="text-center">{user.fechaPedido}</td>

                          <td className="text-center">{user.nombreProducto}</td>
                          <td className="text-center">
                            $ {user.precioUnidadProducto}
                          </td>
                          <td className="text-center">{user.CantidadCompra}</td>
                          <td className="text-right">
                            {user.precioUnidadProducto * user.CantidadCompra}
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
            TotalProductos Pedido $ {this.totalPrice()}
          </strong>
        </h2>
        <div style={{ width: 250, height: 300, flex: 1, flexDirection: "row" }}>
          <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle caret>EstadoPedido</DropdownToggle>
            <DropdownMenu right>
              <DropdownItem header>Estado</DropdownItem>
              <DropdownItem onClick={this.opcion}>En Proceso</DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={this.opcion}>Pago</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    );
  }
}
