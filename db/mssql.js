// var Connection = require("tedious").Connection;
// var Request = require("tedious").Request;

// var config = {
//   userName: "sa", // update me
//   password: "q1w2e3r4,k.l", // update me
//   server: "ldh7edd"
// };

// var connection = new Connection(config);

// connection.on("connect", function(err) {
//   if (err) {
//     console.log(err);
//   } else {
//     executeStatement();
//   }
// });

// function executeStatement() {
//   request = new Request("select 123, 'hello world'", function(err, rowCount) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(rowCount + " rows");
//     }
//     connection.close();
//   });

//   request.on("row", function(columns) {
//     columns.forEach(function(column) {
//       if (column.value === null) {
//         console.log("NULL");
//       } else {
//         console.log(column.value);
//       }
//     });
//   });

//   connection.execSql(request);
// }

const mssql = require("mssql");

var dbConfig = {
  server: "LDH7EDD\\SQLEXPRESS",
  database: "MOPR",
  user: "sa",
  password: "q1w2e3r4,k.l",
  port: 5555
};

function getEmp() {
  var conn = new mssql.ConnectionPool(dbConfig);

  conn
    .connect()
    .then(function() {
      var req = new mssql.Request(conn);
      req
        .query("SELECT * FROM 公會")
        .then(function(recordset) {
          console.log(recordset);
          conn.close();
        })
        .catch(function(err) {
          console.log(err);
          conn.close();
        });
    })
    .catch(function(err) {
      console.log(err);
    });

  //--> another way
  //var req = new sql.Request(conn);
  //conn.connect(function (err) {
  //    if (err) {
  //        console.log(err);
  //        return;
  //    }
  //    req.query("SELECT * FROM emp", function (err, recordset) {
  //        if (err) {
  //            console.log(err);
  //        }
  //        else {
  //            console.log(recordset);
  //        }
  //        conn.close();
  //    });
  //});
}

getEmp();
