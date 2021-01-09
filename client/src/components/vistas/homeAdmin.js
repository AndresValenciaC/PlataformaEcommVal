import React, { Component } from "react";
import Header from "../HeaderDash";
import SideBar from "../sideBarDash";
import Chart from "../Charts";
//import Content1 from "../contenDash1";
export default class homeAdmin extends Component {
  constructor() {
    super();
    this.state = {
      usuarioInfo: [],
      chartData: {},
      comercioInfo: [],
    };
  }

  componentDidMount() {
    fetch("/usuarioInfo")
      .then((res) => res.json())
      .then((usuarioInfo) =>
        this.setState({ usuarioInfo }, () =>
          console.log("usuarioInfo fetched...", usuarioInfo)
        )
      );

    fetch("/commerceInfo")
      .then((res) => res.json())
      .then((comercioInfo) =>
        this.setState({ comercioInfo }, () =>
          console.log("comercioInfo fetched...", comercioInfo)
        )
      );
  }

  componentWillMount() {
    this.getChartData();
  }

  getChartData() {
    this.setState({
      chartData: {
        labels: [
          "Enero",
          "Febrero",
          "Marzo",
          "Abril",
          "Mayo",
          "Junio",
          "Julio",
          "Agosto",
          "Septiembre",
          "Octubre",
          "Noviembre",
          "Diciembre",
        ],
        datasets: [
          {
            label: "Usuarios",
            data: [95, 126, 90, 180, 230, 268, 325, 300, 156, 200, 300, 350],
            backgroundColor: [
              "rgba(255,99,132,0.6)",
              "rgba(54,162,235,0.6)",
              "rgba(255,206,86,0.6)",
              "rgba(75,192,192,0.6)",
              "rgba(255,99,132,0.6)",
              "rgba(54,162,235,0.6)",
              "rgba(255,206,86,0.6)",
              "rgba(75,192,192,0.6)",
              "rgba(255,99,132,0.6)",
              "rgba(54,162,235,0.6)",
              "rgba(255,206,86,0.6)",
              "rgba(75,192,192,0.6)",
              "rgba(255,99,132,0.6)",
              "rgba(54,162,235,0.6)",
              "rgba(255,206,86,0.6)",

              "rgba(75,192,192,0.6)",

              "rgba(75,192,192,0.6)",
            ],
            borderWidth: 1,
            borderColor: "#777",
            hoverBorderWidth: 3,
            hoverBorderColor: "#000",
          },
        ],
      },
    });
  }

  render() {
    return (
      <div>
        <Header
          title1=" Pagina Administrativa"
          title2="componente"
          ruta=" "
          opcion1="opcion1"
          opcion2="opcion2"
          opcion3="opcion3"
        />

        <div>
          <div
            style={{
              marginLeft: "30px",
              marginTop: "20px",
              height: "15vh",
            }}
          >
            <h2
              style={{
                fontSize: 60,
                fontFamily: "fantasy",
                marginTop: "20px",
              }}
            >
              Bienvenido
            </h2>
            {this.state.usuarioInfo.map((usuario) => (
              <h2
                style={{
                  fontSize: 60,
                  fontFamily: "fantasy",
                  marginTop: "20px",
                }}
              >
                {usuario.nombreUsuario} {usuario.apellidoUsuario}
              </h2>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              marginRight: 50,
              marginTop: 80,
              justifyContent: "center",
              alignItems: "center",
              height: "6vh",
            }}
          >
            {this.state.comercioInfo.map((item) => (
              <h2
                style={{
                  fontSize: 70,
                  fontFamily: "fantasy",
                  marginTop: "20px",
                }}
              >
                Comercio {item.nombreTienda}
              </h2>
            ))}
          </div>
        </div>
        <div
          style={{
            marginLeft: "30px",
            marginTop: "30px",
            height: "25px",
          }}
        >
          <SideBar />
        </div>
        <div
          style={{
            marginTop: "100px",
            marginLeft: "250px",
            marginRight: "250px",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <Chart
            chartData={this.state.chartData}
            tituloChart="Numero de usuarios que se inscribieron en la plataforma periodo "
            periodoFecha="2019"
            tituloChart="Numero de usuarios que se inscribieron en la plataforma periodo "
            periodoFecha="2019"
          />
        </div>
      </div>
    );
  }
}
