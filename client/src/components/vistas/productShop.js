import React, { Component } from "react";
import Select from "react-select";
import Axios from "axios";
import Header from "../HeaderDash";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "./productShop.css";
import Progress from "../progress";
const listaCategorias = [
  { label: "Comida", value: "1" },
  { label: "UtenciliosEscolares", value: "2" },
  { label: "UtenciliosElectronicos", value: "3" },
  { label: "Vestuario", value: "4" },
  { label: "Calzado", value: "5" },
  { label: "Bebida", value: "6" },
  { label: "Productos para el hogar", value: "7" },
  { label: "Juguetes", value: "8" }
];

// Start Functions of the Table
const selectRow = {
  mode: "radio",
  clickToSelect: true
};
const cellEdit = {
  mode: "dbclick",
  blurToSave: true

  // beforeSaveCell: onBeforeSaveCell, // a hook for before saving cell
  // afterSaveCell: onAfterSaveCell
};
const productCategoria = [
  "Comida",
  "UtenciliosEscolares",
  "UtenciliosElectronicos",
  "Vestuario",
  "Calzado",
  "Bebida",
  "Productos para el hogar",
  "Juguetes"
];

class productShop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: " ",
      listaProductosCategoria: [],
      optionsChecked: [],
      evento: [],
      selectedFile: null,
      setUploadPorcentage: 0,
      setUploadFile: "",
      productUpload: "",
      idProducto: ""
    };
    this.handleBuy = this.handleBuy.bind(this);
  }

  componentDidMount() {
    fetch("/maxIdProduct")
      .then(res => res.json())
      .then(idProducto =>
        this.setState({ idProducto }, () =>
          console.log("maxIdProduct fetched...", idProducto)
        )
      );
  }

  handleInsertedRow(row, cellName, cellValue) {
    let newRowStr = " ";
    for (const prop in row) {
      newRowStr += prop + ": " + row[prop] + " \n";
    }

    alert("El Nuevo Producto En Catalogo de la Plataforma :\n" + newRowStr);

    var CategoriaProducto =
      row.idCategoriaProducto === "Comida"
        ? 1
        : row.idCategoriaProducto === "UtenciliosEscolares"
        ? 2
        : row.idCategoriaProducto === "UtenciliosElectronicos"
        ? 3
        : row.idCategoriaProducto === "Vestuario"
        ? 4
        : row.idCategoriaProducto === "Calzado"
        ? 5
        : row.idCategoriaProducto === "Bebida"
        ? 6
        : row.idCategoriaProducto === "Productos para el hogar"
        ? 7
        : 8;

    // Send Info to Server

    const url = "/storeProductUpload";
    const productUpload = {
      idCategoriaProducto: CategoriaProducto,
      nombreProducto: row.nombreProducto
    };

    console.log("Productos enviados al server" + productUpload);

    // alert(
    //   "Su producto ya se encuentra en InfoProducto \n" +
    //     " Proceder a subir imagen para completar el proceso"
    // );

    Axios.post(url, productUpload)

      .then(res => {
        if (res) {
          console.log("Respuesta del Servidor Form" + res.data);
        }
        console.log("No Respuesta del Servidor Form" + res.data);
      })
      .catch(e => {});
  }

  // Class that handle Selection Categories Products
  handleChange = selectedOption => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
    let a = selectedOption.label;
    let b = selectedOption.value;
    console.log(`Option a label:`, a, " // ", "Option b value or id:", b);

    const idLista = {
      label: a,
      id: b
    };

    const urlA = "/categoriaProducto";
    Axios.post(urlA, idLista)
      .then(res => {
        console.log("desde handle", res);
        this.setState({ listaProductosCategoria: res.data });
      })
      .catch(e => {
        //
      });
  };

  // Function that handle input from the values of checkboxes

  changeEvent(event) {
    let checkedArray = this.state.optionsChecked;
    let selectedValue = event.target.value;
    let name = event.target.name;
    if (event.target.checked === true) {
      checkedArray.push(selectedValue);
      this.setState({
        optionsChecked: checkedArray
      });
    } else {
      let valueIndex = checkedArray.indexOf(selectedValue);
      checkedArray.splice(valueIndex, 1);

      this.setState({
        optionsChecked: checkedArray
      });
    }
  }

  // Function that gets list of products and send it to the server

  handleBuy = e => {
    alert("Deseas realizar la compra de estos Productos ? ");
    e.preventDefault();
    const productsChecked = this.state.optionsChecked;
    const numProductsChecked = this.state.optionsChecked.length;

    if (numProductsChecked > 0) {
      const url = "/buyProduct";
      console.log("desde If handle buy", productsChecked);
      const productsB = {
        productsB: productsChecked
      };

      Axios.post(url, productsB)
        .then(res => {
          const auth = res.data;
          console.log("Respuesta de axios" + auth.lenght);
        })
        .catch(e => {
          //handle your errors
        });
      alert(
        "Compra  Realizada" +
          "\nPorfavor Ingrese en la pestaña Options a InfoProducto para continuar el proceso.."
      );
      this.setState({
        optionsChecked: [],
        listaProductosCategoria: []
      });
    } else {
      alert("Compra  No Realizada" + "\nPorfavor inicie de nuevo el proceso..");
      this.setState({
        optionsChecked: [],
        listaProductosCategoria: []
      });
    }
  };

  fileSelectedHandler = event => {
    console.log("el fileSelectedHandler" + event.target.files[0]);

    this.setState({
      selectedFile: event.target.files[0]
    });
  };

  fileUploadHandler = () => {
    const formData = new FormData();

    let url =
      "http://andresteccorp.club/TesisAndres/imagenUploadsProductos.php";

    // get the idProducto from DB

    var idProducto = this.state.idProducto.map(function(item) {
      return item.idUltimo + 1;
    });
    console.log("desde fileUploadHandler" + idProducto);
    formData.append("fileImageProducto", this.state.selectedFile);

    formData.set("idProducto", idProducto);

    Axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      },

      onUploadProgress: progressEvent => {
        this.setState({
          setUploadPorcentage: parseInt(
            Math.round((progressEvent.loaded * 100) / progressEvent.total)
          )
        });
        // clear percentage
        //setTimeout(()=> setUploadPorcentage(0),10000);
      }
    })

      .then(res => {
        console.log("Respuesta del Servidor Form" + res.data);
      })
      .catch(e => {
        //handle your errors
      });
  };

  buttonImageUpload() {
    return (
      <div className="d-flex flex-column">
        <input type="file" name="file" onChange={this.fileSelectedHandler} />
        <button onClick={() => this.fileUploadHandler()}>UploadFile</button>
        <div
          style={{
            width: 150,
            height: 25,
            borderWidth: 1,
            margin: 10
          }}
        >
          <Progress percentage={this.state.setUploadPorcentage} />
        </div>
      </div>
    );
  }

  render() {
    const { selectedOption } = this.state;

    const options = {
      afterTableComplete: this.handleTableComplete,
      afterDeleteRow: this.handleDeletedRow,
      afterInsertRow: this.handleInsertedRow
    };
    return (
      <div className="app">
        <Header
          title1="Informacion / Compra de Productos "
          title2="Home"
          ruta="/homeAdmin"
          opcion1="InfoProducto"
          rutaOpcion1="/tableProd"
          opcion2="opcion2"
          opcion3="opcion3"
        />
        <div
          style={{
            fontSize: 35,
            fontFamily: "fantasy",
            alignContent: "center",
            marginTop: "20px"
          }}
          className="container"
        >
          <Select
            value={selectedOption}
            options={listaCategorias}
            onChange={this.handleChange}
          />
        </div>

        <div>
          <label
            style={{
              fontSize: 60,
              fontFamily: "fantasy",
              marginTop: "50px",
              marginLeft: "100px"
            }}
          >
            Articulos Disponibles
          </label>
          <br />
          <label
            style={{
              fontSize: 20,
              fontFamily: "fantasy",
              marginBottom: "20",
              marginLeft: "100px"
            }}
          >
            Porfavor Escoger los Articulos del Catalogo para la Compra. <br />
            Cerciorarse No comprar Producto ya Existente en tu Comercio
          </label>
          <br />

          <div class="grid-container">
            {this.state.listaProductosCategoria.map(item => (
              <div class="styleProduct">
                <Checkbox
                  name={item.nombreProducto}
                  value={item.idProducto}
                  //onCheck={this.props.value}
                  checked={item.checked}
                  onChange={this.changeEvent.bind(this)}
                />
                {item.nombreProducto}
              </div>
            ))}
          </div>
        </div>

        <label
          style={{
            fontFamily: "fantasy",
            fontSize: 35,
            marginLeft: "100px"
          }}
        >
          ID Productos en proceso de compra
          {JSON.stringify(this.state.optionsChecked)}
        </label>
        <div
          style={{
            fontFamily: "fantasy",
            fontSize: 45,
            height: 50,
            width: 500,
            marginLeft: "100px"
            // marginRight: "1300px"
          }}
        >
          <Button
            onClick={this.handleBuy.bind(this)}
            size="large"
            variant="contained"
          >
            COMPRA PRODUCTO
          </Button>
        </div>
        <label
          style={{
            fontSize: 45,
            fontFamily: "fantasy",
            marginTop: "60px",
            marginLeft: "100px"
          }}
        >
          Subir al Catalogo Producto de tu Comercio
        </label>
        <div
          style={{
            marginTop: "20px",
            marginLeft: "100px",
            marginRight: "150px"
          }}
        >
          <BootstrapTable
            // data={}
            striped
            hover
            insertRow={true}
            selectRow={selectRow}
            //  exportCSV
            // deleteRow={true}
            cellEdit={cellEdit}
            options={options}
          >
            <TableHeaderColumn
              width="140"
              isKey
              hidden
              dataField="id"
              autoValue={true}
              // isKey={true}

              // hiddenOnInsert
            >
              IdProducto
            </TableHeaderColumn>
            <TableHeaderColumn
              width="140"
              //  editable={false}

              dataField="idCategoriaProducto"
              editable={{
                type: "select",
                options: { values: productCategoria }
              }}
            >
              Id Categoria Producto
            </TableHeaderColumn>
            <TableHeaderColumn
              width="140"
              dataField="nombreProducto"
              // hiddenOnInsert
              // editable={false}
            >
              Nombre Producto
            </TableHeaderColumn>
            <TableHeaderColumn
              hiddenOnInsert
              width="150"
              dataField="imagenProducto"
              dataFormat={this.buttonImageUpload.bind(this)}

              // hiddenOnInsert
              // editable={false}
            >
              Imagen Producto
            </TableHeaderColumn>
          </BootstrapTable>
        </div>
        <div />
      </div>
    );
  }
}

export default productShop;
