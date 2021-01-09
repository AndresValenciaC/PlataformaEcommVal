import React, { Component } from "react";

import { NavLink } from "react-router-dom";

import "./login.css";
import Axios from "axios";
class login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      name: "",
      contra: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  // Metodo de redireccionar Pagina
  redirectPage = () => {
    const user = {
      name: this.state.name,
      contra: this.state.contra,
      email: this.state.email,
    };

    Axios.post("/loginAuth", user).then((resp) => {
      const auth = resp.data;
      console.log(resp.data.usrAut);
      console.log(resp.data);
      if (auth.inicio === true) {
        this.props.history.push(`/homeAdmin`);
      } else {
        alert("Incorrecto Correo Nombre o Contraseña-Usuario");
        this.resetForm();
      }
    });
  };

  resetForm = () => {
    this.setState({
      name: "",
      email: "",
      contra: "",
    });
  };

  render() {
    return (
      <form
        name="loginAuth"
        action="/loginAuth"
        method="POST"
        onSubmit={this.handleSubmit}
      >
        <h3
          style={{
            fontSize: "60px",
            marginTop: "25px",
            marginLeft: "15px",
            fontFamily: "fantasy",
          }}
        >
          Login - ValenciaCorpEcommerce
        </h3>
        <div className="imgcontainer">
          <img
            src="http://andresteccorp.club/TesisAndres/imagenesProyecto/imagenesProyecto/imagenComercio/portadaEcommerce.jpg"
            alt="Avatar"
            className="avatar"
          />
        </div>

        <div className="container">
          <label>
            <b
              style={{
                fontSize: "35px",
                fontFamily: "fantasy",
              }}
            >
              Correo Cliente
            </b>
          </label>
          <input
            type="text"
            placeholder="Ingrese Correo"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
          />

          <label>
            <b
              style={{
                fontSize: "35px",
                fontFamily: "fantasy",
              }}
            >
              Nombre Cliente
            </b>
          </label>
          <input
            type="text"
            placeholder="Ingrese Primer - Nombre"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />

          <label>
            <b
              style={{
                fontSize: "35px",
                fontFamily: "fantasy",
              }}
            >
              Contraseña Cliente
            </b>
          </label>
          <input
            type="password"
            placeholder="Ingrese Contraseña"
            name="contra"
            value={this.state.contra}
            onChange={this.handleChange}
          />

          <button
            style={{
              fontSize: "25px",
              fontFamily: "fantasy",
            }}
            onClick={this.redirectPage}
            type="submit"
            className="login-btn"
            value="submit"
          >
            Login
          </button>
        </div>

        <div className="container">
          <button
            style={{
              fontSize: "25px",
              fontFamily: "fantasy",
            }}
            type="button"
            className="cancelbtn"
            onClick={this.resetForm}
          >
            Cancel
          </button>
          <span className="psw">
            <NavLink
              style={{
                fontSize: "25px",
                fontFamily: "fantasy",
              }}
              to="register"
            >
              Registrar Cliente-Comercio
            </NavLink>
          </span>
        </div>
      </form>
    );
  }
}

export default login;
