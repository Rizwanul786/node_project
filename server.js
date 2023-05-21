const { start_server, database_connect,authenticateToken, app } = require('./settings');
const { usre_registration,get_all_users,user_login} = require('./user_account');

const connection = database_connect();
start_server(); // Start the server

app.post('/user_account/register', async (req, res) => {
    try {
        if(req.body["username"]=='' || req.body["email"]=='' || req.body["password"]==''){
            res.send({"message":"Values Can't be null or empty"})
        }else{
            const response = await usre_registration(req.body, connection);
            res.send(response);
        }
    } catch (error) {
      res.status(500).send({ error:error });
    }
  });

  app.post('/user_account/login', async (req, res) => {
    try {
        const response = await user_login(req.body, connection);
        res.send(response);
        
    } catch (error) {
      res.status(500).send({ error:error });
    }
  });

app.get("/user_account/get_all_users",authenticateToken, async (req, res) => {
    try {
        const response = await get_all_users(connection);
        res.send(response);
    } catch (error) {
      res.status(500).send({ error:error });
    }
});

app.post('/add_items', (req,res) => {
    var sql = "INSERT INTO BankData (name, city, age, gender, payment) VALUES ?";
    var values = req.body
    connection.query(sql, { params: values }, function (err) {
        if (err){
            throw err
        }
        else{
            res.status(200).json({ message: 'Data inserted successfully' });
        }
    });
})

// app.get("/delete/:id",function(req,res){
//     let id=req.params.id;
//     let sql="DELETE FROM BankData WHERE id='"+id+"'";
//     connection.query(sql,function(err,rows){
//         if(err){
//             console.log("somthing error in the query");
//         }
//     });

//     connection.query("SELECT * FROM BankData",function(err,rows){
//             if(err){
//                 console.log("somthing error in the query");
//             }else{
//                 console.log("success");
//                 res.json(rows);
//             }
//             });
//  });

//  app.post("/edit/:id",function(req,res){
//     var sql="UPDATE `BankData` SET ";
//     sql+="`id`='"+req.body.id+"',";
//     sql+="`name`='"+req.body.name+"',";
//     sql+="`city`='"+req.body.city+"',";
//     sql+="`age`="+req.body.age+",";
//     sql+="`gender`='"+req.body.gender+"',";
//     sql+="`payment`='"+req.body.payment+"' ";
//     sql+="WHERE `BankData`.`id`='"+req.params.id+"'";
//     console.log(sql);  
//     connection.query(sql,function(err){
//           if(err) throw err;
//           res.send("sucessful edited");
//       });   
//  });

//  app.get("/singleobj/:id",function(req,res){
//     var id=req.params.id;
//     let sql="SELECT * FROM `BankData` WHERE id='"+id+"'";
//     connection.query(sql,function(err,row){
//         if(err) throw err;
//         let data=row.find(f1=>f1.id===id);
//       res.json(data);
//     });
//     });

//  app.get("/deleteAll",function(req,res){
//     connection.query("DELETE FROM `BankData`",function(err,rows){
//         if(err){
//             console.log("somthing error in the query");
//         }else{
//             console.log("success");
//             res.send(list);
//         }
//         });
//  });

//  app.post("/addNew",function(req,res){
//     let sql="INSERT INTO `BankData` (`id`,`name`,`city`,`age`,`gender`,`payment`) VALUES ";
//      sql+="('"+req.body.id+"',";
//      sql+="'"+req.body.name+"',";
//      sql+="'"+req.body.city+"',";
//      sql+="'"+req.body.age+"',";
//      sql+="'"+req.body.gender+"',";
//      sql+="'"+req.body.payment+"')";
//   console.log(sql);
//   connection.query(sql,function(err){
//   if(err) throw err;
//   console.log("success");
//   res.send("sucseefull added data");
//   });
//  });