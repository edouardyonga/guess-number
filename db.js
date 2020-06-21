var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "edouard",
  password: "",
  database: "game"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  var sql = "CREATE TABLE user (id INT  AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255), password VARCHAR(255))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });

  // CREATE DATABASE
  // con.query("CREATE DATABASE game", function (err, result) {
  //   if (err) throw err;
  //   console.log("Database created");
  // });
});