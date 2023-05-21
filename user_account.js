const bcrypt = require('bcrypt');
const { app } = require('./settings');

function usre_registration(body, connection) {
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

  function get_all_users(connection){
    return new Promise((resolve, reject) => {
        connection.query("SELECT `id`,`name`,`email` FROM users", function (err, rows, fields) {
            if (err) {
                reject({ error: err, status_code: 500 });
                return;
            } else {
                resolve(rows);
            }
        });
    })
  }
  function user_login(data,connection){
    return new Promise((resolve, reject) => {
        connection.query(
            "SELECT `name`, `email`, `token`,`password` FROM users WHERE `email` = ? AND `name`=?",
            [data.email,data.username],
            function (err, rows, fields) {
              if (err) {
                reject({ error: err, status_code: 500 });
                return;
              } else {
                if (rows.length>0){
                    const user=rows[0]
                    bcrypt.compare(data.password, user.password, (err, result) => {
                        if (err) {
                          // Handle the error
                          console.error('Error comparing passwords:', err);
                          return;
                        }
                        if (result) {
                          // Passwords match
                          console.log('Passwords match');
                          resolve(user);
                        } else {
                          // Passwords don't match
                          console.log("Passwords don't match");
                          reject({ error: "Passwords don't match", status_code: 404 });
                          return;
                        }
                      });
                }
                else{
                    reject({ error: "user not found", status_code: 404 });
                }
              }
            });
    })
  }
  module.exports = {usre_registration,get_all_users,user_login };