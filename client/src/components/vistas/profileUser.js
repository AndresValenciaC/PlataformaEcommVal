import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import Axios from "axios";
import Header from "../HeaderDash";
import Progress from "../progress";

// https://www.js-tutorials.com/nodejs-tutorial/nodejs-example-upload-store-image-mysql-express-js/

const cellEdit = {
  mode: "dbclick",
  blurToSave: true,
  afterSaveCell: onAfterSaveCell,
};

// Start Crud Update Table Usuario
function onAfterSaveCell(row, cellName, cellValue) {
  alert(`Save column ${cellName} with value ${cellValue}`);
  console.log(cellName);
  console.log(cellValue);
  console.log(row.idUsuario);
  let rowStr = "";
  for (const prop in row) {
    rowStr += prop + ": " + row[prop] + "\n";
  }
  // alert("The updated row :\n" + rowStr);
  alert("Updated Column with id : " + row.idUsuario);

  const column = cellName;
  const value = cellValue;
  const id = row.idUsuario;
  const urlA = "/updateUserInfo"; // table usuario
  const updateProductA = {
    column: column,
    value: value,
    id: id,
  };

  Axios.post(urlA, updateProductA)
    .then((res) => {
      //
    })
    .catch((e) => {
      //handle your errors
    });
}

class profileUser extends Component {
  constructor() {
    super();
    this.state = {
      usuarioP: [],
      selectedFile: null,
      selectedFileImagen: "",
      setUploadPorcentage: 0,
      setUploadFile: "",
    };
  }

  componentDidMount() {
    fetch("/usuarioInfo")
      .then((res) => res.json())
      .then((usuarioP) =>
        this.setState({ usuarioP }, () =>
          console.log("Usuario fetched...", usuarioP)
        )
      );
  }

  fileSelectedHandler = (event) => {
    console.log("fileSelectedHandler" + event.target.files[0]);
    console.log("fileSelectedHandler" + event.target.files[0].name);
    var nombreFile = event.target.files[0].name;

    this.setState({
      selectedFile: event.target.files[0],
      selectedFileImagen:
        "http://andresteccorp.club/ecom_val/imagenesProyecto/imagenUsuario/" +
        nombreFile,
    });
  };

  fileUploadHandler = () => {
    const formData = new FormData();
    const setUploadPorcentage = this.state.setUploadPorcentage;
    let url = "http://andresteccorp.club/ecom_val/imagenUploadsUsuario.php";

    // get the idUsuario

    var idUsuario = this.state.usuarioP.map(function (item) {
      return item.idUsuario;
    });

    formData.append("fileImageUsuario", this.state.selectedFile);

    formData.set("idUsuario", idUsuario);
    Axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        this.setState({
          setUploadPorcentage: parseInt(
            Math.round((progressEvent.loaded * 100) / progressEvent.total)
          ),
        });

        // clear percentage
        //setTimeout(()=> setUploadPorcentage(0),10000);
      },
    })

      .then((res) => {
        const auth = res.data;

        console.log("auth----" + auth);

        console.log("auth----" + auth.length);
        if (auth) {
          alert("Imagen subida Satisfactoriamente");
          if (this.state.setUploadPorcentage == 100) {
            this.componentDidMount();
          }
        } else {
          alert("Problemas en Subir Imagen" + "\nTratar de Nuevo");
        }
      })
      .catch((e) => {
        //handle your errors
      });
  };

  render() {
    const options = {
      afterTableComplete: this.handleTableComplete,
    };

    return (
      <div>
        <Header
          title1="
          Administrator Informacion"
          title2="Home"
          ruta="/homeAdmin"
          opcion1="Exit"
          rutaOpcion1=""
          opcion2="opcion2"
          opcion3="opcion3"
        />

        <div>
          <div>
            <h3
              style={{
                fontSize: 60,
                fontFamily: "fantasy",
                marginTop: "30px",
                marginLeft: "350px",
              }}
            >
              Usuario Informacion
            </h3>
          </div>

          <div>
            <ul>
              {this.state.usuarioP.map((user) => (
                <img
                  style={{
                    marginTop: "30px",
                    marginBottom: "30px",
                    marginLeft: "120px",
                    marginRight: "50px",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  width={400}
                  height={400}
                  src={user.imagenUsuario}
                  alt="Nombre de la imagen"
                />
              ))}
            </ul>

            <h3
              style={{
                width: 250,
                height: 25,
                borderWidth: 1,
                margin: 10,
              }}
            >
              {this.state.setUploadFile.fileName}
            </h3>
          </div>
          <div
            style={{
              width: 200,
              height: 25,
              borderWidth: 5,
              margin: 10,
            }}
          >
            <Progress percentage={this.state.setUploadPorcentage} />
          </div>
          <div
            style={{
              width: 150,
              height: 150,
              borderWidth: 1,
              margin: 10,
              flexDirection: "row",
            }}
          >
            <input
              style={{ display: "none" }}
              type="file"
              onChange={this.fileSelectedHandler}
              ref={(fileInput) => (this.fileInput = fileInput)}
            />
            <button
              style={{
                width: 200,
                height: 55,

                fontSize: 20,
                borderRadius: 25,
                paddingHorizontal: 30,
                paddingVertical: 5,
                fontWeight: "500",
                background: "#BDC3C7",
              }}
              onClick={() => this.fileInput.click()}
            >
              Pick file
            </button>
            <button
              style={{
                width: 200,
                height: 55,

                fontSize: 20,
                borderRadius: 25,
                paddingHorizontal: 30,
                paddingVertical: 5,
                fontWeight: "500",
                background: "#BDC3C7",
              }}
              onClick={this.fileUploadHandler}
            >
              Subir imagen
            </button>
          </div>

          <div
            style={{
              marginTop: "50px",
              marginLeft: "150px",
              marginRight: "150px",
            }}
          >
            <BootstrapTable
              data={this.state.usuarioP}
              striped
              cellEdit={cellEdit}
              options={options}
            >
              <TableHeaderColumn width="150" dataField="idUsuario" isKey={true}>
                Id Usuario
              </TableHeaderColumn>
              <TableHeaderColumn width="150" dataField="nombreUsuario">
                Nombre Usuario
              </TableHeaderColumn>
              <TableHeaderColumn width="150" dataField="apellidoUsuario">
                Apellido Usuario
              </TableHeaderColumn>
              <TableHeaderColumn width="150" dataField="correoUsuario">
                Correo Usuario
              </TableHeaderColumn>
              <TableHeaderColumn width="150" dataField="direccionUsuario">
                Dirección Usuario
              </TableHeaderColumn>
              <TableHeaderColumn width="150" dataField="telefonoUsuario">
                Telefono Usuario
              </TableHeaderColumn>
              <TableHeaderColumn width="150" dataField="passW">
                PassWord Usuario
              </TableHeaderColumn>
            </BootstrapTable>
          </div>
        </div>
      </div>
    );
  }
}

export default profileUser;

/**
 *  <ul>
              {this.state.usuarioP.map(user => (
                <img
                  style={{
                    marginTop: "30px",
                    marginBottom: "30px",
                    marginLeft: "120px",
                    marginRight: "50px",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                  width={400}
                  height={400}
                  src={user.imagenUsuario}
                  alt="Card image cap"
                />
              ))}
            </ul>
 */
