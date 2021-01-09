import React, { Component } from "react";
import Header from "../header";
import { Link } from "react-router-dom";
import Axios from "axios";

export default class deliveryInCurse extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "Please select your title",
      ordersInProgres: [],
      idp: [],
    };
  }

  componentDidMount() {
    fetch("/pedidosStore")
      .then((res) => res.json())
      .then((ordersInProgres) =>
        this.setState({ ordersInProgres }, () =>
          console.log("ordersInProgres fetched...", ordersInProgres)
        )
      );
  }

  renderTableHeader() {
    let header = ["id-Pedido", "fecha", "Hora", "Estado-Pedido", "Info-Pedido"];
    return header.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  }

  renderTableData() {
    return this.state.ordersInProgres.map((item, index) => {
      const { idPedido, fechaPedido, horaPedido } = item; //destructuring
      const { pedidoEstado } = item;

      return (
        <tr key={idPedido}>
          <td>{idPedido}</td>
          <td>{fechaPedido}</td>
          <td>{horaPedido}</td>
          <td>{pedidoEstado === 1 ? "EnProceso" : "Cancelado"}</td>
          <td>
            <Link to={{ pathname: "/deliveryInCurseInfo", idP: item.idPedido }}>
              <h5> Informacion del Pedido</h5>
            </Link>
            <Link>
              <h5>Pagos</h5>
            </Link>
            <button
              style={styles.button}
              onClick={this.eliminarP.bind(this, item.idPedido)}
            >
              Eliminar Pedido
            </button>
          </td>
        </tr>
      );
    });
  }

  eliminarP(item) {
    // Send info to server
    var idPedido = item;

    const a = {
      idPedido: idPedido,
    };
    const url = "/eliminarPedido";
    Axios.post(url, a)
      .then((res) => {
        if (res) {
          alert("Pedido Eliminado");
          this.componentDidMount();
        }
      })
      .catch((e) => {
        //
      });
  }

  render() {
    console.log(this.state.ordersInProgres);

    return (
      <div>
        <div class="text-center">
          <Header title="Pedidos En Proceso" />
        </div>
        <div>
          <div>
            <h2
              style={{
                fontSize: 60,
                fontFamily: "fantasy",
                marginTop: "30px",
                marginLeft: "100px",
              }}
            >
              Pedido En Linea Informacion
            </h2>
          </div>
          <div
            style={{
              marginTop: "50px",
              marginLeft: "150px",
              marginRight: "150px",
            }}
          >
            <div style={styles.table}>
              <table class="table table-striped" id="pedidos">
                <tbody>
                  <tr>{this.renderTableHeader()}</tr>
                  {this.renderTableData()}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  button: {
    borderWidth: 20,
    padding: 10,
    borderColor: "black",
    backgroundColor: "#BFBFBF",
  },
  table: {
    padding: 5,
  },
};
