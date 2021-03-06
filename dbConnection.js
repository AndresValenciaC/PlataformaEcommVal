const mysql = require("mysql");

/**  Connect to Hosting Server
var connection = mysql.createConnection({
  host: "158.69.3.64",
  user: "mydigita_andresCampoTesis",
  password: "@tesisUSCandres@",
  database: "mydigita_ValenciaAndresTesis_DB"
});
*/

// El Host es el Shared IP Address del servidor de alojamiento

// var connection = mysql.createConnection({
//   host: "158.69.3.64",
//   user: "mydigita_andresCampoTesis",
//   password: "@tesisUSCandres@",
//   database: "mydigita_ValenciaAndresTesis_DB"
// });

/** Connection a new Server SiteGround
 Host 35.209.244.236
DataBase dbecb23gbnxuy7
usuario u3m7xjrumjja4
pass u3m7xjrumjja4*/

// var connection = mysql.createConnection({
//   host: "35.209.244.236",
//   user: "ubkzwedezp79m",
//   password: "9pqkhqu86bkz",
//   database: "dbecb23gbnxuy7",
// });

var connection = mysql.createConnection({
  host: "190.90.160.165",
  user: "andreste_andres",
  password: "fn@p3Ru5nH+!",
  database: "andreste_ecom_proyecto",
});

/** 
// Connect to LocalHost
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "ValenciaAndresTesis_DB"
});
*/
connection.connect(function (err) {
  if (err) {
    console.error("Error Connecting to DataBase: " + err.stack);
    return;
  }

  console.log("Connected to DataBase " + connection.threadId);
});

module.exports = connection;
