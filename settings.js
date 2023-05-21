const express = require("express");
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

secret_key='desIgn'

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

// Middleware to verify token
function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, secret_key, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    
    // Attach the decoded user information to the request object
    req.user = decoded;
    next();
  });
}

module.exports = { start_server, database_connect, authenticateToken, app,secret_key }; // Export the app variable