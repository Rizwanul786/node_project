const express = require("express");
const mysql = require('mysql2');

const app = express();
app.use(express.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  next();
});

function start_server() {
  let port = 2424;
  app.listen(port, () => console.log("Listening port", port));
}

function database_connect() {
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Password@101',
    database: 'bank_info'
  });

  connection.connect(function(err) {
    if (err) {
      console.log("Connection error:", err);
    } else {
      console.log("Successful connected");
    }
  });

  return connection;
}

module.exports = { start_server, database_connect, app }; // Export the app variable