import React, { Component } from "react";
import "./register.css";
import Axios from "axios";
import { Link } from "react-router-dom";
export default class register extends Component {
  constructor() {
    super();
    this.state = {
      nombre: "",
      apellido: "",
      correo: "",
      password: "",
      direccion: "",
      telephone: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Metodos

  resetForm = () => {
    this.setState({
      nombre: "",
      apellido: "",
      correo: "",
      direccion: "",
      telephone: "",
      password: ""
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
      this.state.apellido === "" ||
      this.state.correo === "" ||
      this.state.direccion === "" ||
      this.state.telephone === "" ||
      this.state.password === ""
    ) {
      alert("Porfavor No Dejar Vacios \n" + "Ningun Campo Del Formato");
      this.resetForm();
    } else {
      const url = "/registerUser";
      const user = {
        nombre: this.state.nombre,
        apellido: this.state.apellido,
        correo: this.state.correo,
        direccion: this.state.direccion,
        telephone: this.state.telephone,
        password: this.state.password
      };

      Axios.post(url, user)
        .then(res => {
          const inicio = res.data.inicio;
          console.log(inicio);
          if (inicio === false) {
            alert("Datos Ya en DataBase\n" + "Intenta De Nuevo");
            this.resetForm();
          } else {
            this.resetForm();
            alert("Usuario Registrado\n" + "Ingresar en Login");
            this.props.history.push(`/`);
          }
        })

        .catch(e => {
          //handle your errors
        });
    }
  }

  // Metodo de redireccionar Pagina
  /** redirectPage = () => {
    Axios.get("/userAuth").then(resp => {
      const auth = resp.data.usrAut;
      console.log(resp.data.usrAut);
      console.log(resp.data);
      if (auth === true) {
        this.props.history.push(`/homeAdmin`);
      } else {
        alert("Usuario no Registrado");
      }
    });
  };*/

  resAutRegister() {
    Axios.get("/registerUser").then(resp => {
      const auth = resp.data.authRegiser;
      console.log(resp.data.authRegiser);
      console.log("RespuestaServerRegister" + resp.data);
      if (auth === true) {
        this.props.history.push(`/`);
        alert("Usuario Registrado Satisfactoriamente");
        this.resetForm();
      } else {
        this.resetForm();
        alert("Usuario No Registrado\n" + "Informacion ya Existente en DataBase");
      }
    });
  }

  render() {
    return (
      <form
        name="regform"
        action="/registerUser"
        method="POST"
        onSubmit={this.handleSubmit}
      >
        <div class="container">
          <h1
            style={{
              fontSize: "50px",
              marginTop: "25px",

              fontFamily: "fantasy"
            }}
          >
            Registro Cliente Administrador
          </h1>
          <p>Porfavor llenar todos los campos para su registro</p>
          <hr />
          <label for="nombre">
            <b
              style={{
                fontSize: "35px",
                fontFamily: "fantasy"
              }}
            >
              Nombre
            </b>
          </label>
          <input
            type="text"
            placeholder="EnterNombre"
            name="nombre"
            value={this.state.nombre}
            onChange={this.handleChange}
          />

          <label for="apellido">
            <b
              style={{
                fontSize: "35px",
                fontFamily: "fantasy"
              }}
            >
              Apellidos
            </b>
          </label>
          <input
            type="text"
            placeholder="EnterApellido"
            name="apellido"
            value={this.state.apellido}
            onChange={this.handleChange}
          />

          <label for="Direccion">
            <b
              style={{
                fontSize: "35px",
                fontFamily: "fantasy"
              }}
            >
              Direccion
            </b>
          </label>
          <input
            type="text"
            placeholder="EnterDireccion"
            name="direccion"
            value={this.state.direccion}
            onChange={this.handleChange}
          />
          <label for="Telephone">
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
            placeholder="EnterTelephone"
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
              Email
            </b>
          </label>
          <input
            type="text"
            placeholder="EnterEmail"
            name="correo"
            value={this.state.correo}
            onChange={this.handleChange}
          />

          <label for="psw">
            <b
              style={{
                fontSize: "35px",
                fontFamily: "fantasy"
              }}
            >
              Password
            </b>
          </label>
          <input
            type="password"
            placeholder="EnterPassword"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
          />

          <hr />

          <p>
            Creando esta cuenta tu aceptas nuestros
            <a> Terminos y privacidad</a>
          </p>
          <button
            style={{
              fontSize: "25px",
              fontFamily: "fantasy"
            }}
            onClick={this.redirectPage}
            type="submit"
            class="registerbtn"
            value="submit"
          >
            Registrar
          </button>
          <button
            style={{
              fontSize: "25px",
              fontFamily: "fantasy"
            }}
            type="button"
            class="cancelbtn"
            onClick={this.resetForm}
          >
            Cancelar
          </button>
        </div>

        <div class="container signin">
          <p>
            Ya te encuentras inscrito?{" "}
            <Link
              style={{
                fontSize: "25px",
                fontFamily: "fantasy"
              }}
              to="/"
            >
              Login
            </Link>
          </p>
        </div>
      </form>
    );
  }
}
