import React, { Component } from "react";
// with es6
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import Header from "../HeaderDash";
import Axios from "axios";
import Progress from "../progress";

// Edit cells values and save them
const cellEdit = {
  mode: "dbclick",
  blurToSave: true,
  beforeSaveCell: onBeforeSaveCell, // a hook for before saving cell
  afterSaveCell: onAfterSaveCell,
};

const selectRowProp = {
  mode: "checkbox",
  clickToSelect: true,
};

// Start Crud -- Update Table Producto and table Comercio Producto
function onAfterSaveCell(row, cellName, cellValue) {
  alert(`Save column ${cellName} with value ${cellValue}`);
  console.log(cellName);
  console.log(cellValue);
  console.log(row.idProducto);
  let rowStr = "";
  for (const prop in row) {
    rowStr += prop + ": " + row[prop] + "\n";
  }
  alert("The updated row :\n" + rowStr);
  const nombreTienda = row.nombreTienda;
  const nombreProducto = row.nombreProducto;
  const descripcionProducto = row.descripcionProducto;
  const precioUnidadProducto = row.precioUnidadProducto;
  const cantidadProducto = row.cantidadProducto;
  const idProducto = row.idProducto;
  const idCategoriaProducto = row.idCategoriaProducto;
  const nombreCategoria = row.nombreCategoria;

  const updateProductA1 = {
    nombreTienda: nombreTienda,
    nombreProducto: nombreProducto,
    descripcionProducto: descripcionProducto,
    precioUnidadProducto: precioUnidadProducto,
    cantidadProducto: cantidadProducto,
    idProducto: idProducto,
    idCategoriaProducto: idCategoriaProducto,
    nombreCategoria: nombreCategoria,
  };

  const column = cellName;
  const value = cellValue;
  const id = row.idProducto;

  const updateProductA = {
    column: column,
    value: value,
    id: id,
  };
  const urlA = "/updateProductA"; // table producto
  Axios.post(urlA, updateProductA)
    .then((res) => {
      //
    })
    .catch((e) => {
      //handle your errors
    });

  const urlB = "/updateProductB"; // table comecioProducto
  const updateProductB = {
    column: column,
    value: value,
    id: id,
  };

  Axios.post(urlB, updateProductB)
    .then((res) => {
      //
    })
    .catch((e) => {
      //handle your errors
    });
}
// End Crud Update Table Producto and table Comercio Producto

function onBeforeSaveCell(row, cellName, cellValue) {}

/**        VALIDACIONES
 * validator function pass the user input value and row object. In addition, a bool return value is expected
 */
function NameValidator(value, row) {
  const response = {
    isValid: true,
    notification: { type: "success", msg: "", title: "" },
  };
  if (!value) {
    response.isValid = false;
    response.notification.type = "error";
    response.notification.msg = "Value must be inserted";
    response.notification.title = "Requested Value";
  } else if (value.length < 8) {
    response.isValid = false;
    response.notification.type = "error";
    response.notification.msg = "Value must have 8+ characters";
    response.notification.title = "Invalid Value";
  }
  return response;
}

function numberValidator(value, row) {
  const nan = isNaN(parseInt(value, 10));
  if (nan) {
    return " must be a integer!";
  }
  return true;
}

export default class tableProd extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      lastId: [],
      selectedFile: null,
      setUploadPorcentage: 0,
      setUploadFile: "",
      productUpload: "",
      idProducto: "",
      clickedRowID: null,
    };
  }

  componentDidMount() {
    fetch("/productoInfo")
      .then((res) => res.json())
      .then((products) =>
        this.setState({ products }, () =>
          console.log("products fetched...", products)
        )
      );

    fetch("/maxIdProduct")
      .then((res) => res.json())
      .then((lastId) =>
        this.setState({ lastId }, () =>
          console.log("lastId -- from table product fetched...", lastId)
        )
      );
  }

  // ********************* Metodos del CRUD de la tabla *************** \\

  handleTableComplete(row) {}

  handleInsertedRow(row) {
    let newRowStr = " ";
    for (const prop in row) {
      newRowStr += prop + ": " + row[prop] + " \n";
    }

    alert("The new row is:\n " + newRowStr);

    const urlA = "/insertProductA";
    const urlB = "insertProductB";
    var idCate = row.nombreCategoria === "Comida" ? 1 : 6;

    const productInsertA = {
      namePrIns: row.nombreProducto,

      idCatePrIns: idCate,
    };

    const productInsertB = {
      cantProducto: row.cantidadProducto,
      precioProducto: row.precioUnidadProducto,
      descrProd: row.descripcionProducto,
    };

    Axios.post(urlA, productInsertA)
      .then((res) => {
        //
      })
      .catch((e) => {
        //handle your errors
      });

    Axios.post(urlB, productInsertB)
      .then((res) => {
        //
      })
      .catch((e) => {
        //handle your errors
      });
  }

  // cant delete a product that its in pedido process
  handleDeletedRow(rowKeys) {
    const idRowProd = rowKeys;
    alert("El producto a eliminar es: " + idRowProd);

    const deleteP = {
      delProduct: rowKeys,
    };
    console.log(deleteP);

    const urlA = "/deleteProduct";
    Axios.post(urlA, deleteP)
      .then((res) => {
        const auth = res.data;

        console.log("desde tablepro--" + res.data.err);
        if (auth.err === true) {
          alert(
            "Producto No Se Puede Eliminar \n" +
              "Producto Se Encuentra En Proceso De Venta"
          );
          res.end();
        } else if (auth.err === false) {
          alert("Producto Eliminado");

          res.end();
        }
      })
      .catch((e) => {
        //
      });
  }

  priceFormatter(cell) {
    return <p>${cell}</p>;
  }

  // Methods that upload Imagefile and render image from DB

  fileSelectedHandler = (event) => {
    console.log("el fileSelectedHandler" + event.target.files[0]);

    this.setState({
      selectedFile: event.target.files[0],
    });
  };

  fileUploadHandler = () => {
    const formData = new FormData();

    let url = "http://andresteccorp.club/ecom_val/imagenUploadsProductos.php";

    // get the idProducto from state

    var idProducto = this.state.clickedRowID;

    console.log("desde fileUploadHandler" + idProducto);
    formData.append("fileImageProducto", this.state.selectedFile);

    formData.set("idProducto", idProducto);

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
      },
    })

      .then((res) => {
        const auth = res.data;

        console.log("auth----" + auth);

        console.log("auth----" + auth.length);
        if (auth) {
          alert("Imagen subida Satisfactoriamente");
        }
        if (this.state.setUploadPorcentage == 100) {
          this.componentDidMount();
        } else {
          alert("Problemas en Subir Imagen" + "\nTratar de Nuevo");
        }
      })
      .catch((e) => {
        //handle your errors
      });
  };

  buttonImageUpload(cell) {
    return (
      <div>
        <img style={{ width: 80, height: 100, marginBottom: 20 }} src={cell} />
        <input type="file" name="file" onChange={this.fileSelectedHandler} />
        <button
          style={{
            width: 100,
            height: 50,
          }}
          onClick={() => this.fileUploadHandler()}
        >
          UploadFile
        </button>
        <div
          style={{
            width: 100,
            height: 20,
          }}
        >
          <Progress percentage={this.state.setUploadPorcentage} />
        </div>
      </div>
    );
  }

  onRowClick(row) {
    this.setState({ clickedRowID: row.idProducto });
  }
  render() {
    this.onRowClick = this.onRowClick.bind(this);
    console.log("clickedRowEstado" + this.state.clickedRowID);
    const options = {
      afterTableComplete: this.handleTableComplete,
      afterDeleteRow: this.handleDeletedRow,
      afterInsertRow: this.handleInsertedRow,
      insertBtn: this.createCustomInsertButton,
      onRowClick: this.onRowClick,
    };

    return (
      <div>
        <Header
          title1="Informacion Productos Comercio"
          title2="Home"
          ruta="/homeAdmin"
          opcion1="Log-Out"
          rutaOpcion1=""
          opcion2="CompraProducto"
          rutaOpcion2="/productShop"
          opcion3="OfertaProducto"
          rutaOpcion3="/tableOfert"
        />

        <h1
          style={{
            fontSize: 60,
            fontFamily: "fantasy",
            marginTop: "50px",
            marginLeft: "100px",
          }}
        >
          Productos del Comercio
        </h1>
        <h3
          style={{
            fontSize: 25,
            fontFamily: "fantasy",
            marginTop: "25px",
            marginLeft: "100px",
          }}
        >
          {" "}
          No se puede eliminar mas de un producto diferente simultáneamente{" "}
          <br /> Si el producto se encuentra en proceso de Venta no se puede
          <br /> Si el producto se encuentra en proceso de Pedido no se puede
          eliminar
        </h3>

        <div
          style={{
            marginTop: "70px",
            //     marginLeft: "150px",
            //     marginRight: "150px"
          }}
        >
          <BootstrapTable
            data={this.state.products}
            striped
            selectRow={selectRowProp}
            exportCSV
            deleteRow={true}
            cellEdit={cellEdit}
            options={options}
          >
            <TableHeaderColumn
              width="150"
              editable={false}
              dataField="idProducto"
              isKey={true}
            >
              Catalogo ProductoId
            </TableHeaderColumn>
            <TableHeaderColumn
              width="150"
              editable={false}
              dataField="nombreProducto"
              filter={{ type: "TextFilter", delay: 1000 }}
            >
              Producto Nombre
            </TableHeaderColumn>
            <TableHeaderColumn
              width="150"
              filter={{ type: "NumberFilter", delay: 1000 }}
              dataField="idComercioProducto"
              editable={false}
            >
              Codigo ProductoComercio
            </TableHeaderColumn>

            <TableHeaderColumn
              editable={false}
              width="150"
              dataField="nombreCategoria"
            >
              Producto Categoria
            </TableHeaderColumn>
            <TableHeaderColumn
              width="150"
              dataField="descripcionProducto"
              editable={{ validator: NameValidator }}
            >
              Producto Descripción
            </TableHeaderColumn>

            <TableHeaderColumn width="150" dataField="cantidadProducto">
              Producto Stock
            </TableHeaderColumn>
            <TableHeaderColumn
              width="150"
              dataFormat={this.priceFormatter}
              dataField="precioUnidadProducto"
            >
              Producto Precio
            </TableHeaderColumn>
            <TableHeaderColumn
              width="150"
              dataField="imagenProducto"
              dataFormat={this.buttonImageUpload.bind(this)}
              editable={false}
            >
              Imagen Producto
            </TableHeaderColumn>
          </BootstrapTable>
        </div>
      </div>
    );
  }
}
