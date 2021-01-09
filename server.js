// Npm Modules
const conn = require("./dbConnection");
const express = require("express");
const app = express();
const router = express.Router();
const session = require("express-session");
const path = require("path");

app.use(
  session({
    secret: "88j2wjwkola,l,9h772bsqnjn1jn2jn4$)/&GF",
    resave: false,
    saveUninitialized: true,
  })
);
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const fileUpload = require("express-fileupload");
app.use(fileUpload());

/** Middle Ware */

const whitelist = [
  "http://localhost:3000",
  "http://localhost:5000",
  "http://localhost:8080",
  "https://shrouded-journey-38552.heroku.com",
];
const corsOptions = {
  origin: function (origin, callback) {
    console.log("** Origin of request " + origin);
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log("Origin acceptable");
      callback(null, true);
    } else {
      console.log("Origin rejected");
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.post("/logout", (req, res) => {
  console.log("Logout", req.body);
  const a = req.body;
  var idU = req.session.userid;
  if (a) {
    req.session.destroy((err) => {
      if (err) {
        return console.log(err);
      }

      console.log("Salio de Session El Usuario");
    });
  } else {
    console.log("No se pudo Salir de Session");
  }
});

/************** Fin Creacion y Destruccion de la Session Para c/u de los Administradores ************************* */

/** 
post = recive info del cliente   get = manda info al cliente  tener en cuenta la ruta va a la pagina Weeb
******************************************************************************************** */
// 1A -rest api for Login from client & DB

app.post("/loginAuth", function (request, response) {
  var username = request.body.name;
  var usercorreo = request.body.email;
  var usercontra = request.body.contra;
  var idPerfilUsuario = 2;
  var idPerfilUsAdmin = 1;

  console.log(
    "entra desde Viewlogin ---" + username,
    usercorreo,
    usercontra,
    idPerfilUsuario,
    idPerfilUsAdmin
  );
  if (username && usercorreo && usercontra) {
    conn.query(
      "SELECT a.idUsuario,a.correoUsuario,a.passW,a.idPerfilUsuario FROM usuario a  WHERE a.nombreUsuario = ?  AND a.correoUsuario = ?  AND a.passW = ?  AND a.idPerfilUsuario = ? ",
      [username, usercorreo, usercontra, idPerfilUsuario],
      function (error, results, fields) {
        if (results.length > 0) {
          var userid = results[0].idUsuario;
          var email = results[0].correoUsuario;
          var idPerfil = results[0].idPerfilUsuario;

          request.session.loggedin = true;
          request.session.IdPerfil = idPerfil;
          request.session.userid = userid;
          request.session.usercorreo = email;

          console.log("En Session el idUsuario : " + request.session.userid);
          response.json({ inicio: true });
        } else {
          console.log("No respuesta de BD");
          response.json({ inicio: false });
        }
        response.json();
        response.end(username);
      }
    );
  } else {
    console.log("Existen los Datos");
    response.end();
  }
});

/**_________________________________________________________________________ */
// 1B -rest api for Login user Authentication
app.get("/loginAuth", function (request, response) {
  if (request.session.loggedin) {
    var userAuthenObjet = {
      usrAut: request.session.loggedin,
      idUsuario: request.session.userid,
      correo: request.session.usercorreo,
      idPerfilUsuario: request.session.IdPerfil,
      idComercio: request.session.idcomer,
      idUltimoProducto: request.session.lastIdProduct,
    };
  }
  response.json(userAuthenObjet);

  /**------------------------------------------------ */
});

// Se necesita el idComercio como variable de Session en todo el aplicativo
app.get("/idComercioSession", function al(req, res) {
  var userid = req.session.userid;

  conn.query(
    "SELECT idComercio FROM comercio WHERE idUsuario = ?",
    [userid],
    function (error, results, fields) {
      if (error) throw error;
      const idComer = results[0].idComercio;
      req.session.idcomer = idComer;
      console.log("The Id Comerce is  : " + req.session.idcomer);
      res.end(JSON.stringify(results));
    }
  );
});

// Se obtiene primero el id del ultimo producto de la tabla producto que es el IdProducto y se coloca en session
app.get("/maxIdProduct", function al(req, res) {
  conn.query(
    " SELECT MAX(idProducto) as idUltimo  from producto",
    function (error, results, fields) {
      if (error) throw error;
      const idUltimo = results[0].idUltimo;
      req.session.lastIdProduct = idUltimo;
      console.log(
        "Las id (Max) in product table is  : " + req.session.lastIdProduct
      );
      res.end(JSON.stringify(results));
    }
  );
});

/**GET INFO FROM TABLES FOR ROUTES*/

//2- rest api Info to get all user info from DB
app.get("/usuarioInfo", function (req, res) {
  var idU = req.session.userid;
  console.log(idU);
  conn.query(
    "SELECT a.idUsuario,a.nombreUsuario, a.apellidoUsuario,a.correoUsuario,a.imagenUsuario,a.direccionUsuario,a.telefonoUsuario,a.passW FROM usuario a  WHERE idUsuario = ?",
    [idU],

    function (error, results, fields) {
      if (error) throw error;
      res.end(JSON.stringify(results));
      console.log(results);
    }
  );
});

//2A1 - rest api to update User Info
app.post("/updateUserInfo", function (req, res) {
  const column = req.body.column;
  const value = req.body.value;
  const id = req.body.id;

  let post1 = {
    column,
    value,
    id,
  };

  let sql1 = `UPDATE usuario SET ${column} = '${value}' where idUsuario = ${id}`;

  if (req.session.loggedin) {
    let query = conn.query(sql1, post1, (err, result) => {
      if (err) throw err;
      console.log("Usuario table Updated");
    });
  }
});

//2B- rest api Info to get all Commerce info from table comercio
app.get("/commerceInfo", function (req, res) {
  var idUser = req.session.userid;
  conn.query(
    "SELECT a.idComercio,a.idUsuario,a.correoComercio,a.direccionComercio,a.nombreTienda,a.detalleComercio,a.telefonoComercio,a.imagenComercio FROM comercio a  INNER JOIN usuario b  ON a.idUsuario = b.idUsuario  WHERE a.idUsuario = ?",
    [idUser],

    function (error, results, fields) {
      if (error) throw error;
      res.end(JSON.stringify(results));
    }
  );
});
//2B1 - rest api to update Commerce Info
app.post("/updateCommerceInfo", function (req, res) {
  const column = req.body.column;
  const value = req.body.value;
  const id = req.body.id;

  let post1 = {
    column,
    value,
    id,
  };

  console.log("Post-Update Comercio", post1);
  let sql1 = `UPDATE comercio SET ${column} = '${value}' where idComercio = ${id}`;

  if (req.session.loggedin) {
    let query = conn.query(sql1, post1, (err, result) => {
      if (err) throw err;
      console.log("Usuario table Updated");
    });
  }
});

//3- rest api Info to get all product info + costumers info from pedidoProducto para factura
/** 
app.get("/facturaInfo", function(req, res) {
  idComm = req.session.idcomer;
  conn.query(
    "SELECT a.idPedidoFactura,b.idUsuario,c.nombreUsuario,c.apellidoUsuario, a.idProducto, a.cantidadProducto, e.precioUnidadProducto, d.nombreProducto, b.fecha, b.idComercio from pedidoProducto a  INNER JOIN pedidoFactura b ON a.idPedidoFactura = b.idPedidoFactura INNER JOIN usuario c ON b.idUsuario = c.idUsuario  INNER JOIN producto d ON a.idProducto = d.idProducto INNER JOIN comercioProducto e ON e.idProducto = a.idProducto WHERE b.idComercio = ?",
    [idComm],
    function(error, results, fields) {
      if (error) throw error;
      res.end(JSON.stringify(results));
    }
  );
});
*/

//4  -rest api to get the costumers info of that specific commerce from DB table pedidoFactura
app.get("/clienteComercioInfo", function (req, res) {
  userid = request.session.userid;
  var session = request.session.loggedin;
  conn.query(
    "SELECT idComercio FROM comercio WHERE idUsuario = ?",
    [userid],
    function (error, results, fields) {
      if (error) throw error;

      if (results.length > 0 && session) {
        var idComercio = results[0].idComercio;
        conn.query(
          "SELECT a.idUsuario, a.nombreUsuario, a.apellidoUsuario, a.correoUsuario, a.direccionUsuario, a.telefonoUsuario from usuario a INNER JOIN pedidoFactura b ON a.idUsuario = b.idUsuario WHERE b.idComercio = ? AND a.idPerfilUsuario = 3",
          [idComercio],
          function (error, results, fields) {
            if (error) throw error;
            res.end(JSON.stringify(results));
          }
        );
      }
    }
  );
});

//5- rest api to get all product info + oferta info from Logged -Session- User from DB desde Tabla comercioProducto, comercio y categoriaProducto
app.get("/productoInfo", function (request, res) {
  userid = request.session.userid;
  var session = request.session.loggedin;
  conn.query(
    "SELECT idComercio FROM comercio WHERE idUsuario = ?",
    [userid],
    function (error, results, fields) {
      if (error) throw error;

      if (results.length > 0 && session) {
        var idComercio = results[0].idComercio;
        conn.query(
          "SELECT b.nombreTienda,c.nombreProducto,a.precioUnidadProducto, a.cantidadProducto, a.descripcionProducto, a.idComercioProducto, c.idProducto, c.idCategoriaProducto, c.imagenProducto, d.nombreCategoria from comercioProducto a INNER JOIN comercio b ON a.idComercio = b.idComercio INNER JOIN producto c ON a.idProducto = c.idProducto INNER JOIN categoriaProducto d ON c.idCategoriaProducto = d.idCategoriaProducto  WHERE b.idComercio = ?",
          [idComercio],
          function (error, results, fields) {
            if (error) throw error;
            res.end(JSON.stringify(results));
          }
        );
      }
    }
  );
});

//6- rest api to Register-Usuario
app.post("/registerUser", function (req, response) {
  const nombre = req.body.nombre;
  const apellido = req.body.apellido;
  const correo = req.body.correo;
  const direccion = req.body.direccion;
  const telephone = req.body.telephone;
  const password = req.body.password;
  const idPerfilU = 2;

  let post = {
    idPerfilUsuario: idPerfilU,
    nombreUsuario: nombre,
    apellidoUsuario: apellido,
    correoUsuario: correo,
    direccionUsuario: direccion,
    telefonoUsuario: telephone,
    passW: password,
  };

  console.log("Register User -Post", post);

  //-------------------------------------------------------
  if (idPerfilU === 2) {
    conn.query(
      "SELECT correoUsuario, nombreUsuario, passW from usuario WHERE correoUsuario = ? AND nombreUsuario = ? AND passW =  ? ",
      [correo, nombre, password],

      function (error, results, fields) {
        if (results.length > 0) {
          console.log("DatosRepetidos");

          response.json({ inicio: false });
        } else {
          let sql1 = "INSERT into usuario set ?";
          let query = conn.query(sql1, post, (err, result) => {
            if (err) throw err;
          });
          console.log("IngresoBien");
          response.json({ inicio: true });
        }
        response.json();
        response.end();
      }
    );
  } else {
    console.log("Datos No Entraron");
    response.end();
  }
});

// 7A- rest api to for Register-Comercio en tabla Comercio and Usuario

/************************************ */

app.post("/registerStoreA", function (req, res) {
  const idUsuario = req.session.userid;
  const nombre = req.body.nombre;
  const correo = req.body.correo;
  const direccion = req.body.direccion;
  const telephone = req.body.telephone;
  const detalle = req.body.detalle;
  let post = {
    idUsuario: idUsuario,
    correoComercio: correo,
    direccionComercio: direccion,
    nombreTienda: nombre,
    detalleComercio: detalle,
    telefonoComercio: telephone,
  };
  console.log("RegistroStoreA post---", post);
  //  Insertar id de comercio en tabla usuario despues de insertar comercio en tabla comercio
  if (req.session.loggedin) {
    let sql = "INSERT into comercio set ?";
    let query = conn.query(sql, post, (err, result) => {
      if (err) throw err;
      console.log("se inserto comercio");
      // res.end();
      // res.end(JSON.stringify(result));
      //  res.send("se inserto comercio");
    });
  } else {
    console.log("No se inserto comercio");
  }

  /************************************ */
});

/************************************ */

// 8 Api with the information of all the categories aplication for productShop in categoriaProducto

app.post("/categoriaProducto", function (req, res) {
  console.log("post", req.body);
  var idCatPr = req.body.id;
  req.session.idCategoriaProducto = idCatPr;
  conn.query(
    "SELECT idProducto,nombreProducto from producto where idCategoriaProducto = ?",
    [idCatPr],

    function (error, results, fields) {
      if (error) throw error;
      res.end(JSON.stringify(results));
    }
  );
});

/** 
// 9 Select products for productShop View from producto Table
app.get("/categoriaProducto", function(req, res) {
  var idCatPr = req.session.idCategoriaProducto;
  conn.query(
    "SELECT a.idProducto, a.nombreProducto, b.nombreCategoria from producto a INNER JOIN categoriaProducto b ON a.idCategoriaProducto = b.idCategoriaProducto  where b.idCategoriaProducto = ?",
    [idCatPr],
    function(error, results, fields) {
      if (error) throw error;
      res.end(JSON.stringify(results));
    }
  );
});
*/

// ************** - Productos CRUD to manipulate info and insert products from products already owned by client  *************
/**
For tableProduct manipulate info and productShop to insert products in list or new ones 
 */

/** START JUST ADMINISTRATION */

// Insert ProductoA en la tabla producto, just for the owner
app.post("/insertProductA", function (req, res) {
  const nombreProducto = req.body.namePrIns;

  const idCategoriaProducto = req.body.idCatePrIns;

  // para la tabla producto
  let post1 = {
    // idProducto el campo es vacio, en tabla es auto incrementable
    idCategoriaProducto,
    nombreProducto,
  };

  console.log("Post1", post1);

  let sql1 = "INSERT into producto set ?";
  let query = conn.query(sql1, post1, (err, result) => {
    if (err) throw err;
    console.log("Se Inserto ProductoA en tabla producto");
  });
});
/********************************************************** */
app.get("/productoInfo", function (request, res) {
  userid = request.session.userid;
  var session = request.session.loggedin;
  conn.query(
    "SELECT idComercio FROM comercio WHERE idUsuario = ?",
    [userid],
    function (error, results, fields) {
      if (error) throw error;

      if (results.length > 0 && session) {
        var idComercio = results[0].idComercio;
        conn.query(
          "SELECT b.nombreTienda,c.nombreProducto,a.precioUnidadProducto, a.cantidadProducto, a.descripcionProducto, a.idComercioProducto, c.idProducto, c.idCategoriaProducto, d.nombreCategoria from comercioProducto a INNER JOIN comercio b ON a.idComercio = b.idComercio INNER JOIN producto c ON a.idProducto = c.idProducto INNER JOIN categoriaProducto d ON c.idCategoriaProducto = d.idCategoriaProducto  WHERE b.idComercio = ?",
          [idComercio],
          function (error, results, fields) {
            if (error) throw error;
            res.end(JSON.stringify(results));
          }
        );
      }
    }
  );
});
/********************************************************** */

//Insertar Id ProductoB en la tabla Comercio Producto for Clients
app.post("/insertProductB", function (req, res) {
  userid = req.session.userid;
  var session = req.session.loggedin;
  conn.query(
    "SELECT idComercio FROM comercio WHERE idUsuario = ?",
    [userid],
    function (error, results, fields) {
      if (error) throw error;

      if (results.length > 0 && session) {
        var idComercioR = results[0].idComercio;
        var idComercio = idComercioR;
        var idProducto = req.session.lastIdProduct + 1;
        const cantidadProducto = req.body.cantProducto;
        const precioUnidadProducto = req.body.precioProducto;
        const descripcionProducto = req.body.descrProd;
        // para la tabla Comercio producto
        let post2 = {
          idComercio,
          idProducto,
          cantidadProducto,
          precioUnidadProducto,
          descripcionProducto,
        };
        let sql1 = "INSERT into ComercioProducto set ?";
        let query = conn.query(sql1, post2, (err, result) => {
          if (err) throw err;
          console.log("se Inserto ComercioProducto");
        });
      }
    }
  );
});

/** END JUST ADMINISTRATION */

// Insert values in table Comercio producto of products for users from productShop View
// From productShop View First part
app.post("/buyProduct", function (req, res) {
  var products = req.body.productsB;

  var userid = req.session.userid;
  var session = req.session.loggedin;

  console.log("desde server /buyProduct", products, userid, session);

  products.forEach(pushDB);

  function pushDB(value, index, array) {
    conn.query(
      "SELECT idComercio FROM comercio WHERE idUsuario = ?",
      [userid],
      function (error, results) {
        if (error) throw err;
        if (results.length > 0 && session) {
          var idComercioR = results[0].idComercio;
          console.log(
            "idComercio En metodo" +
              idComercioR +
              "los productos - value" +
              value
          );

          conn.query(
            "INSERT INTO comercioProducto(idComercio, idProducto,cantidadProducto,precioUnidadProducto,descripcionProducto) VALUES (?,?,?,?,?)",
            [idComercioR, value, 0, 0, ""]
          );
          console.log("Insertado producto en tabla comercioProducto");
        }
      }
    );
  }
});

/**Delete Producto de la tabla comercioProducto para Cliente del comercio  perfil #2
 *   and Delete producto from producto if  perfil #1 Admin
 *
 * se puede eliminar siempre y cuando el producto No se encuentre en Itempedidos en estado proceso
 *
 * */

app.post("/deleteProduct", function (req, res) {
  var idDel = req.body.delProduct;
  var idPerfilUsuario = req.session.IdPerfil;
  var userid = req.session.userid;

  console.log("DeleteProducto" + idDel, idPerfilUsuario, userid);
  conn.query(
    "SELECT idComercio FROM comercio WHERE idUsuario = ?",
    [userid],
    function (error, results, fields) {
      if (error) throw error;

      if (results.length > 0 && session) {
        var idComercioR = results[0].idComercio;

        if (session && idPerfilUsuario == 1) {
          conn.query(
            " Delete from producto where idProducto = ? ",
            [idDel],

            function (error, results, fields) {
              if (error) throw error;
              res.end(JSON.stringify(results));
            }
          );
        } else if (session && idPerfilUsuario == 2) {
          conn.query(
            " Delete from comercioProducto where idProducto = ? and idComercio = ?",
            [idDel, idComercioR],
            function (error, results, fields) {
              if (error) {
                try {
                  console.log("Respuesta mala del servidor");
                } catch (error) {}
              }

              res.json({ err: false });
              res.end(JSON.stringify(results));
            }
          );
        }
      }
    }
  );
});

// Update Producto de la tabla Producto solo para OWNER idPerfilUsuario : 1

app.post("/updateProductA", function (req, res) {
  const column = req.body.column;
  const value = req.body.value;
  const id = req.body.id;
  idPerfilUsuario = req.session.IdPerfil;
  let post1 = {
    column,
    value,
    id,
  };

  console.log("Post-Update 1", post1);

  let sql1 = `UPDATE producto SET ${column} = '${value}' where idProducto = ${id}`;
  //let sql2 = conn.query("SELECT count(*) as contador FROM information_schema.COLUMNS WHERE COLUMN_NAME = 'idProducto' and TABLE_NAME = 'Producto' and TABLE_SCHEMA = 'AndresTesisDB'")

  if (req.session.loggedin && idPerfilUsuario == 1) {
    let query1 = conn.query(sql1, post1, (err, result) => {
      if (err) throw err;
      console.log("Match-Columns -- Product table Updated");
    });
  }
  // res.redirect("/updateProductB");
  console.log("Columns didnt Match");
});

// Update Producto de la tabla ComercioProducto para clientes de la plataforma idPerfilUsuario : 2
app.post("/updateProductB", function (req, res) {
  const column = req.body.column;
  const value = req.body.value;
  const id = req.body.id;
  idPerfilUsuario = req.session.IdPerfil;
  let post2 = {
    column,
    value,
    id,
  };
  console.log("Post-Update 2", post2);

  let sql2 = `UPDATE comercioProducto SET ${column} = '${value}' where idProducto = ${id}`;
  if (req.session.loggedin && idPerfilUsuario == 2) {
    let query = conn.query(sql2, post2, (err, result) => {
      if (err) throw err;
      console.log("ComercioProducto table Updated");
    });
  }
  res.redirect("/updateProductA");
});

// User Store Products Upload in Data Base -- Insert new product in product table
app.post("/storeProductUpload", function (req, res) {
  var idUsuario = req.session.userid;
  var idCategoriaProducto = req.body.idCategoriaProducto;
  var nombreProducto = req.body.nombreProducto;
  var session = req.session.loggedin;

  console.log(
    "Info Server Url" + idUsuario,
    idCategoriaProducto,
    nombreProducto,
    session
  );
  conn.query(
    "SELECT idComercio FROM comercio WHERE idUsuario = ?",
    [idUsuario],
    function (error, results, fields) {
      if (error) throw error;
      if (results.length > 0 && session) {
        var idComercioR = results[0].idComercio;
        console.log("el id comercio en el if" + idComercioR);
        // Insertar en la tabla come

        conn.query(
          "INSERT INTO producto(idCategoriaProducto,nombreProducto,imagenproducto) VALUES (?,?,?)",
          [idCategoriaProducto, nombreProducto, ""]
        );

        if (req.session.loggedin && req.session.userid == idUsuario) {
          conn.query(
            " SELECT MAX(idProducto) as idUltimo  from producto",
            function (error, res) {
              if (res) var idUltimo = res[0].idUltimo;
              console.log(
                "El id ultimo en la funcionn " +
                  idUltimo +
                  "el idComercio -" +
                  idComercioR
              );
              conn.query(
                "INSERT INTO comercioProducto(idComercio, idProducto,cantidadProducto,precioUnidadProducto,descripcionProducto) VALUES (?,?,?,?,?)",
                [idComercioR, idUltimo, 0, 0, ""]
              );

              if (error) throw error;
            }
          );
        } else {
          console.log(
            " No Se Inserto Producto en tabla producto o comercioProducto"
          );
        }
      }
    }
  );
});

// *******************************         Fin   Productos CRUD      *******************************************

//*********************************** Start CRUD for ofert table   ***************************/

// Select Query of products that have an ofert  from ofertaProducto Table
app.get("/ofertInfo", function (req, res) {
  userid = req.session.userid;
  var session = req.session.loggedin;
  conn.query(
    "SELECT idComercio FROM comercio WHERE idUsuario = ?",
    [userid],
    function (error, results, fields) {
      if (error) throw error;

      if (results.length > 0 && session) {
        var idComercio = results[0].idComercio;
        conn.query(
          "SELECT b.idComercioProducto,a.idComercio, a.idProducto, d.nombreProducto, b.idOfertaProducto,b.codigoOferta,c.tipoOferta, b.descuento from comercioProducto a INNER JOIN ofertaProducto b ON a.idComercioProducto = b.idComercioProducto INNER JOIN oferta c ON b.codigoOferta = c.codigoOferta INNER JOIN producto d ON d.idProducto = a.idProducto WHERE a.idComercio = ?",
          [idComercio],
          function (error, results, fields) {
            if (error) throw error;
            res.end(JSON.stringify(results));
          }
        );
      }
    }
  );
});

// Update oferts from table oferta Producto
app.post("/updateOferta", function (req, res) {
  const column = req.body.Column;
  const value = req.body.Value;
  const TipoOfertaId = req.body.TipoOfertaId;

  const IdComercioProducto = req.body.Codigo;
  idPerfilUsuario = req.session.IdPerfil;
  let postUpdateOfert = {
    column,
    value,
    IdComercioProducto,
    TipoOfertaId,
  };
  console.log("postUpdateOfert", postUpdateOfert);

  let sql = `UPDATE ofertaProducto SET ${column} = '${value}' where idComercioProducto = ${IdComercioProducto}`;
  if (req.session.loggedin && idPerfilUsuario == 2) {
    let query = conn.query(sql, postUpdateOfert, (err, result) => {
      if (err) throw err;
      console.log("OfertaProducto table Updated");
    });
  }
});

// Delete oferts from table oferta Producto
app.post("/deleteOfert", function (req, res) {
  idDel = req.body.idComercioProducto;
  idPerfilUsuario = req.session.IdPerfil;

  console.log(idDel, idPerfilUsuario);

  if (req.session.loggedin && idPerfilUsuario == 2) {
    conn.query(
      " Delete from ofertaProducto where idComercioProducto = ?",
      [idDel],

      function (error, results, fields) {
        if (error) throw error;
        console.log("Ofert Deleted");
      }
    );
  } else {
    console.log("Ofert Not Deleted");
  }
  res.end();
});

// Insert new oferts in ofert table with the products you have in comercoProducto Table
app.post("/insertOfert", function (req, res) {
  const idComercioProducto = req.body.CodigoProductoComercio;
  const codigoOferta = req.body.TipoOfertaId;
  const descuento = req.body.DescuentoOferta;
  const user = req.session.userid;
  //  const user = 40;
  const session = req.session.loggedin;
  //  const session = true;
  // para la tabla Comercio producto
  let post = {
    idComercioProducto,
    codigoOferta,
    descuento,
  };
  console.log("insertOfert1-", post);
  console.log("insertOfert2-" + idComercioProducto, user);
  if (session) {
    conn.query(
      "SELECT idComercio FROM comercio WHERE idUsuario = ?",
      [user],

      function (error, results, fields) {
        var a = results.length;
        console.log("resultados1-" + results.length);
        if (error) throw error;
        if (results.length > 0) {
          var idComercio = results[0].idComercio;
          console.log("El idComercio" + idComercio);
          conn.query(
            "SELECT idProducto FROM comercioProducto WHERE idComercioProducto = ? and idComercio = ?",
            [idComercioProducto, idComercio],

            function (error, results, fields) {
              console.log("resultados2-" + results.length);
              if (error) throw error;
              if (results.length > 0) {
                conn.query(
                  "INSERT INTO ofertaProducto(idComercioProducto,codigoOferta,descuento) VALUES (?,?,?)",
                  [idComercioProducto, codigoOferta, descuento]
                );
                console.log("Oferta Agregada");
                res.json({ oferta: true });
                //  res.end(JSON.stringify(results));
              } else {
                res.json({ oferta: false });
              }
            }
          );
        }
      }
    );
  } else {
    console.log("Usuario No se encuentra en Session");
  }
});

/***************************** END CRUD for ofert table   ************/

// *********************** Start Pedidos ********************************
// Pedidos Store Estado
app.get("/pedidosStore", function (req, res) {
  var pedidoEstado = 1;
  userid = req.session.userid;
  var session = req.session.loggedin;
  conn.query(
    "SELECT idComercio FROM comercio WHERE idUsuario = ?",
    [userid],
    function (error, results, fields) {
      if (error) throw error;

      if (results.length > 0 && session) {
        var idComercio = results[0].idComercio;
        conn.query(
          "SELECT idPedido,fechaPedido,horaPedido,pedidoEstado from pedidoProducto where idComercio = ? and pedidoEstado = ?",
          [idComercio, pedidoEstado],
          function (error, results, fields) {
            if (error) throw error;
            res.end(JSON.stringify(results));
          }
        );
      }
    }
  );
});

// Pedidos Store Info
app.post("/itemInfoPedidoProducto", function (req, res) {
  const idPedido = req.body.idPed;
  const user = req.session.userid;
  const b = 1;
  // para la tabla itemPedidos
  console.log("post Post", req.body);
  console.log("/itemInfoPedidoProducto Post", idPedido);

  conn.query(
    "SELECT a.idPedido, a.idComercioProducto, c.nombreProducto,a.cantidadCompra, b.cantidadProducto, a.precioUnidad   FROM itemPedidos a  INNER JOIN comercioProducto b ON a.idComercioProducto = b.idComercioProducto INNER JOIN producto c ON b.idProducto = c.idProducto  WHERE idPedido = ?",
    [idPedido],
    function (error, results, fields) {
      console.log("Desde Server Post -----", results);
      if (error) throw error;
      res.end(JSON.stringify(results));
    }
  );
});

// Pedidos Buyer Info
app.post("/userInfoPedidoProducto", function (req, res) {
  const idPedido = req.body.idPed;
  const user = req.session.userid;
  const b = 1;
  // para la tabla itemPedidos
  console.log("post Post", req.body);
  console.log("/userInfoPedidoProducto Post", idPedido);

  conn.query(
    "SELECT a.idPedido, b.nombreUsuario,b.apellidoUsuario,b.correoUsuario,b.direccionUsuario,b.telefonoUsuario FROM pedidoProducto a INNER JOIN usuario b ON a.idUsuario = b.idUsuario  WHERE a.idPedido = ?  ",
    [idPedido],
    function (error, results, fields) {
      console.log("Desde Server Post -----", results);
      if (error) throw error;
      res.end(JSON.stringify(results));
    }
  );
});

// Eliminar
app.post("/eliminarPedido", function (req, res) {
  var idPedido = req.body.idPedido;
  var userid = req.session.userid;
  var session = req.session.loggedin;
  console.log("El userId" + userid);
  conn.query(
    "SELECT idComercio FROM comercio WHERE idUsuario = ?",
    [userid],
    function (error, results, fields) {
      if (error) throw error;

      if (results.length > 0 && session) {
        var idComercio = results[0].idComercio;
        console.log(idPedido, idComercio);
        conn.query(
          " DELETE FROM itemPedidos where idPedido  = ? ",
          [idPedido],
          function (error, results, fields) {
            if (results) {
              conn.query(
                " DELETE FROM pedidoProducto where idPedido  = ? and idComercio = ? ",
                [idPedido, idComercio]
              );
            }
            console.log("se elimino pedido de pedidoProducto y itemPedidos ");
            res.end(JSON.stringify(results));
          }
        );
      }
    }
  );
});

// *********************** End Pedidos ********************************

// postImgin  Example Data Base
/** 
app.post("/usuarioImage", (req, res) => {
  const idUsuario = req.session.userid;

  //http://mydigitall.com/TesisAndres/imagenesProyecto/imagenUser/

  if (req.files === null) {
    return res.status(400).json({ msg: "File not uploaded" });
  }

  const file = req.files.file;
  var fileName = file.name;

  if (
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/png" ||
    file.mimetype == "image/gif"
  ) {
    // Use the mv() method to place the file somewhere on your server
    file.mv(
      `${__dirname}/client/public/uploads/imagenUsuario/${file.name}`,
      err => {
        if (err) {
          console.err(err);
          return res.status(500).send(err);
        }
        res.json({
          fileName: file.name,
          filePath: `/uploads/imagenUsuario/${file.name}`
        });
        // res.json({ fileName: file.name, filePath: `/uploads/imagenComercio/${file.name}`});

        var nombreUsuario = fileName;

        conn.query(
          " Update usuario set imagenUsuario = ? where idUsuario = ? ",
          [nombreUsuario, idUsuario],
          function(error, results, fields) {
            console.log("Desde Server Post -----", results);
            if (error) throw error;
            res.end(JSON.stringify(results));
          }
        );
      }
    );
  } else {
    message =
      "This format is not allowed , please upload file with '.png','.gif','.jpg'";
    console.log(message);
  }
});
*/
/************************************ END ****************************************************** */

// It serve React to the browser.

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));
  // Handle React routing, return all requests to React app
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

/** Deploy to heroku
 * https://www.youtube.com/watch?v=xgvLP3f2Y7k&list=WL&index=61
 */

const port = process.env.port || 5000;
app.listen(port, () => `Server running on port ${port}`);
