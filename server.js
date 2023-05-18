const { start_server, database_connect, app } = require('./settings');

const connection = database_connect();
start_server(); // Start the server

app.get("/get_all_customer", function (req, res) {
    connection.query("SELECT * FROM BankData", function (err, rows, fields) {
        if (err) {
            console.log("somthing error in the query");
        } else {
            console.log("success");
            res.json(rows);
        }
    });
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