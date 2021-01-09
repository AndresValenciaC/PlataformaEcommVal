import React, { Component } from "react";

import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import Header from "../HeaderDash";
import Axios from "axios";
//mport "node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css";

const selectRow = {
  mode: "radio",
  clickToSelect: true,
};
const cellEdit = {
  mode: "dbclick",
  blurToSave: true,
  // beforeSaveCell: onBeforeSaveCell, // a hook for before saving cell
  afterSaveCell: onAfterSaveCell,
};

function numberValidator(value, row) {
  const nan = isNaN(parseInt(value, 10));
  if (nan) {
    return " Debe de ser un Numero Entero!";
  }
  return true;
}
const productOfertAmount = ["", "Bono", "Descuento", "Promo2*1", "Promo3*1"];

// Start Crud Update Table ofertaProducto and table Comercio Producto
function onAfterSaveCell(row, cellName, cellValue) {
  alert(`Save column ${cellName} with value ${cellValue}`);
  // console.log(cellName);
  // console.log(cellValue);

  // console.log(row.idComercioProducto);

  let rowStr = "";
  for (const prop in row) {
    rowStr += prop + ": " + row[prop] + "\n";
  }
  alert("The updated row :\n" + rowStr);
  var TipoOfertaId =
    row.tipoOferta === "Bono"
      ? 1
      : row.tipoOferta === "Descuento"
      ? 2
      : row.tipoOferta === "Promo2*1"
      ? 3
      : 4;
  var Column = cellName === "tipoOferta" ? "codigoOferta" : "descuento";
  const updateOferta = {
    Column: Column,

    Value:
      cellName === "descuento"
        ? cellValue
        : cellName === "tipoOferta"
        ? TipoOfertaId
        : "",
    TipoOfertaId: TipoOfertaId,
    Codigo: row.idComercioProducto,
  };
  console.log(updateOferta);
  const url = "/updateOferta"; // table oferta
  Axios.post(url, updateOferta)
    .then((res) => {
      //
    })
    .catch((e) => {
      //handle your errors
    });
}
// End Crud Update Table Producto and table Comercio Producto

export default class tableOfert extends Component {
  constructor() {
    super();
    this.state = {
      ofertInfo: [],
    };
  }
  componentDidMount() {
    fetch("/ofertInfo")
      .then((res) => res.json())
      .then((ofertInfo) =>
        this.setState({ ofertInfo }, () =>
          console.log("ofertInfo fetched...", ofertInfo)
        )
      );
  }

  // Crud of Oferts
  handleDeletedRow(rowKeys) {
    const idRowProd = rowKeys;
    alert("La Oferta a eliminar es del Commercio/ProductoId : " + idRowProd);

    const deleteO = {
      idComercioProducto: rowKeys,
    };
    console.log(deleteO);

    const url = "/deleteOfert";
    Axios.post(url, deleteO)
      .then((res) => {
        //
      })
      .catch((e) => {
        //
      });
  }

  handleInsertedRow = (row) => {
    let newRowStr = " ";
    for (const prop in row) {
      newRowStr += prop + ": " + row[prop] + " \n";
    }

    alert("La nueva Oferta Es:\n " + newRowStr);

    var TipoOfertaId =
      row.tipoOferta === "Bono"
        ? 1
        : row.tipoOferta === "Descuento"
        ? 2
        : row.tipoOferta === "Promo2*1"
        ? 3
        : 4;

    const url1 = "/insertOfert";
    const ofertInsert = {
      CodigoProductoComercio: row.idComercioProducto,
      TipoOfertaId: TipoOfertaId,
      DescuentoOferta: row.descuento,
    };

    console.log(ofertInsert);
    Axios.post(url1, ofertInsert).then((resp) => {
      const auth = resp.data;
      console.log(resp.data.oferta);
      console.log(auth);
      if (auth.oferta === true) {
        alert("Oferta Establecida Satisfactoriamente");
        this.componentDidMount();
      } else {
        alert(
          "Oferta No Establecida" +
            "\nPorfavor revisar el codigo Comercio-Producto"
        );
      }
    });
  };

  render() {
    console.log("el estado" + this.state.ofertInfo);
    const options = {
      afterTableComplete: this.handleTableComplete,
      afterDeleteRow: this.handleDeletedRow,
      afterInsertRow: this.handleInsertedRow,
    };
    return (
      <div>
        <div>
          <Header
            title1="Informacion Ofertas Comercio"
            title2="Home"
            ruta="/homeAdmin"
            opcion1="Log-Out"
            rutaOpcion1=""
            opcion2="InfoProducto"
            rutaOpcion2="/tableProd"
            opcion3="opcion3"
          />
        </div>
        <div>
          <h1
            style={{
              fontSize: 60,
              fontFamily: "fantasy",
              marginTop: "30px",
              marginLeft: "100px",
            }}
          >
            Ofertas Producto
          </h1>
        </div>
        <div
          style={{
            marginTop: "50px",
            marginLeft: "150px",
            marginRight: "150px",
          }}
        >
          <BootstrapTable
            data={this.state.ofertInfo}
            striped
            hover
            condensed
            insertRow={true}
            selectRow={selectRow}
            exportCSV
            deleteRow={true}
            cellEdit={cellEdit}
            options={options}
          >
            <TableHeaderColumn
              width="150"
              dataField="idComercioProducto"
              // hiddenOnInsert
              isKey={true}
              filter={{ type: "NumberFilter", delay: 1000 }}
            >
              Codigo ProductoComercio
            </TableHeaderColumn>

            <TableHeaderColumn
              width="150"
              dataField="nombreProducto"
              hiddenOnInsert
              editable={false}
              //   filter={{ type: "TextFilter", delay: 1000 }}
            >
              Nombre Producto
            </TableHeaderColumn>

            <TableHeaderColumn
              width="150"
              editable={false}
              dataField="tipoOferta"
              editable={{
                type: "select",
                options: { values: productOfertAmount },
              }}
              //  dataField="Tipo Oferta Bono"
            >
              Tipo Oferta Producto
            </TableHeaderColumn>
            <TableHeaderColumn width="150" dataField="descuento" editable={{}}>
              Compensacion %
            </TableHeaderColumn>
          </BootstrapTable>
        </div>
      </div>
    );
  }
}
