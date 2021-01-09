import React, { Component } from "react";
import "./register.css";
import Axios from "axios";
import { Link } from "react-router-dom";
import Header from "../HeaderDash";
export default class registerStore extends Component {
  constructor() {
    super();
    this.state = {
      nombre: "",
      direccion: "",
      telephone: "",
      detalle: "",
      correo: "",
      idCom: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Metodos

  resetForm = () => {
    this.setState({
      nombre: "",
      correo: "",
      direccion: "",
      telephone: "",
      detalle: ""
    });
  };

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault(); 
 if (
   this.state.nombre === "" ||
   this.state.correo === "" ||
   this.state.correo === "" ||
   this.state.direccion === "" ||
   this.state.telephone === "" ||
   this.state.detalle === ""
 ) {
   alert("Porfavor No Dejar Vacios \n" + "Ningun Campo Del Formato");
   this.resetForm();
 } else {
   const urlA = "/registerStoreA";
   const storeA = {
     nombre: this.state.nombre,
     correo: this.state.correo,
     direccion: this.state.direccion,
     telephone: this.state.telephone,
     detalle: this.state.detalle
   };

   Axios.post(urlA, storeA)
     .then(resp => {
       const nombre = this.state.nombre;

       console.log("Desdes axios Registar Tienda -- ", resp);
     })
     .catch(e => {});

   alert("Comercio Registrado");
   this.resetForm();
 }
  }

  render() {
    console.log("El Primer estado del idCom--", this.state.idCom);
    return (
      <form method="POST" onSubmit={this.handleSubmit}>
        <Header
          title1="
          Registro Informacion Comercio"
          title2="Home"
          ruta="/homeAdmin"
          opcion1="Exit"
          rutaOpcion1=""
          opcion2="opcion2"
          opcion3="opcion3"
        />

        <div className="container">
          <h1
            style={{
              fontSize: "50px",
              marginTop: "25px",

              fontFamily: "fantasy"
            }}
          >
            Registro Comercio
          </h1>
          <p>
            Porfavor llenar todos los campos para el registro de su comercio
          </p>
          <hr />
          <label for="nombre">
            <b
              style={{
                fontSize: "35px",
                fontFamily: "fantasy"
              }}
            >
              Nombre Comercio
            </b>
          </label>
          <input
            type="text"
            placeholder="EnterNombre"
            name="nombre"
            value={this.state.nombre}
            onChange={this.handleChange}
          />

          <label for="Direccion">
            <b
              style={{
                fontSize: "35px",
                fontFamily: "fantasy"
              }}
            >
              Dirección Comercio
            </b>
          </label>
          <input
            type="text"
            placeholder="EnterDireccion"
            name="direccion"
            value={this.state.direccion}
            onChange={this.handleChange}
          />
          <label for="Telephone Comercio">
            <b
              style={{
                fontSize: "35px",
                fontFamily: "fantasy"
              }}
            >
              Telefono
            </b>
          </label>
          <input
            type="text"
            placeholder="EnterTelefono"
            name="telephone"
            value={this.state.telephone}
            onChange={this.handleChange}
          />

          <label for="email">
            <b
              style={{
                fontSize: "35px",
                fontFamily: "fantasy"
              }}
            >
              Correo Comercio
            </b>
          </label>
          <input
            type="text"
            placeholder="EnterCorreo"
            name="correo"
            value={this.state.correo}
            onChange={this.handleChange}
          />

          <label for="Detalle Comercio">
            <b
              style={{
                fontSize: "35px",
                fontFamily: "fantasy"
              }}
            >
              Detalle Comercio
            </b>
          </label>
          <input
            type="text"
            placeholder="EnterDetalleComercio"
            name="detalle"
            value={this.state.detalle}
            onChange={this.handleChange}
          />
          <hr />

          <p>Gracias por crear registar tu comercio en nuestra aplicacion</p>
          <button
            style={{
              fontSize: "25px",
              fontFamily: "fantasy"
            }}
            type="submit"
            className="registerbtn"
            value="submit"
            //  onClick={this.handleSubmit}
          >
            Registrar Comercio
          </button>
          <button
            style={{
              fontSize: "25px",
              fontFamily: "fantasy"
            }}
            type="button"
            className="cancelbtn"
            onClick={this.resetForm}
          >
            Cancelar
          </button>
        </div>

        <div className="container signin">
          <p>
            Si cuentas con un comercio ya registrado, por favor ir a :
            <Link
              style={{
                fontSize: "25px",
                fontFamily: "fantasy"
              }}
              to="/homeAdmin"
            >
              Home
            </Link>
          </p>
        </div>
      </form>
    );
  }
}
