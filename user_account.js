const bcrypt = require('bcrypt');
const { app } = require('./settings');

function usre_register(body, connection) {
    return new Promise((resolve, reject) => {
      const { username, email, password } = body;
      
      // Perform validation for username, email, and password here
      
      // Hash the password using bcrypt
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          reject({ error: err, status_code: 500 });
          return;
        }
        
        // Save the user to the database
        const user = {
          name: username,
          email,
          password: hash // Store the hashed password
        };
        
        connection.query('INSERT INTO users SET ?', user, (error, results) => {
          if (error) {
            console.error('Error saving user to the database:', error);
            reject({ error: error, status_code: 500 });
            return;
          }
          
          // Respond with success message
          resolve({ message: 'User registered successfully', status_code: 201 });
        });
      });
    });
  }

  module.exports = {usre_register };